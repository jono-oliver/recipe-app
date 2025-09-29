import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
if (!process.env.SPOONACULAR_API_KEY) {
    console.error("SPOONACULAR_API_KEY is required");
    process.exit(1);
}
if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is required");
    process.exit(1);
}

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Ingredients autocomplete endpoint
app.post("/api/ingredients-autocomplete", async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query || query.length < 2) {
            return res.json({ ingredients: [] });
        }

        const apiKey = process.env.SPOONACULAR_API_KEY;
        
        // Use direct HTTP request to Spoonacular API
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${encodeURIComponent(query)}&number=10&metaInformation=true&apiKey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Format the response for frontend
        const ingredients = data.map(item => ({
            id: item.id,
            name: item.name,
            image: item.image,
        }));

        res.json({ ingredients });
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        res.status(500).json({ error: "Failed to fetch ingredients" });
    }
});

// Recipe generator endpoint
app.post("/api/recipe-generator", async (req, res) => {
    try {
        const { ingredients } = req.body;
        
        // Validate ingredients array
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ error: "Ingredients array is required and must not be empty" });
        }
        
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = `You are helping someone cook with leftover ingredients they have at home. Create a simple, practical recipe using ONLY these ingredients: ${ingredients.join(', ')}. 

        IMPORTANT: The person only has these specific ingredients available. They do have basic pantry staples like salt, pepper, common herbs/spices, cooking oil, and normal kitchen equipment (pans, utensils, oven, stovetop, etc.).

        Keep it simple and practical - this is for someone cooking at home with what they have, not a fancy restaurant dish. Make sure the recipe is easy to follow and uses ONLY the provided ingredients as the main components.`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        recipeName: {
                            type: "string",
                            description: "The name of the recipe"
                        },
                        description: {
                            type: "string",
                            description: "Brief description of what you're making"
                        },
                        ingredients: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "List of ingredients with quantities"
                        },
                        instructions: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "Step-by-step cooking instructions"
                        },
                        cookingTime: {
                            type: "string",
                            description: "Total cooking time (e.g., '30 minutes')"
                        },
                        difficulty: {
                            type: "string",
                            description: "Difficulty level (Easy, Medium, Hard)"
                        },
                        serves: {
                            type: "string",
                            description: "Number of people it serves (e.g., '4 people')"
                        },
                        tips: {
                            type: "string",
                            description: "Helpful tips for substitutions or variations"
                        }
                    },
                    required: ["recipeName", "description", "ingredients", "instructions", "cookingTime", "difficulty", "serves"],
                    propertyOrdering: ["recipeName", "description", "ingredients", "instructions", "cookingTime", "difficulty", "serves", "tips"]
                }
            }
        });

        // Parse the JSON response
        const recipeData = JSON.parse(result.text);
        res.json({ recipe: recipeData });
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});