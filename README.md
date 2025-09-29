# Scavengr - Recipe Generator App

Scavengr is a web application that helps you create recipes from ingredients you already have at home. Simply search for your available ingredients, add them to your list, and let AI generate a personalized recipe for you.

## Features

- **Ingredient Search**: Real-time autocomplete search powered by Spoonacular API
- **Smart Recipe Generation**: AI-powered recipe creation using Google Gemini
- **Responsive Design**: Beautiful, modern UI that works on desktop and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Ingredient Management**: Easy add/remove ingredients with visual feedback

## Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for accessible UI components
- **Lucide React** for icons
- **Radix UI** primitives for component foundations

### Backend
- **Node.js** with Express
- **Google Gemini AI** for recipe generation
- **Spoonacular API** for ingredient data

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys for:
  - [Spoonacular API](https://spoonacular.com/food-api)
  - [Google Gemini API](https://ai.google.dev/)

## UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for its component library, which provides:
- Pre-built, accessible React components
- Built on Radix UI primitives
- Styled with Tailwind CSS
- Fully customizable and copy-pasteable
- TypeScript support (though this project uses JavaScript)

The components are located in `src/components/ui/` and include Button, Card, and DropdownMenu components.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd recipe-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Required API Keys
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Optional Configuration
APP_PORT=3000
```

### 4. Get API Keys

#### Spoonacular API Key
1. Visit [Spoonacular API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `SPOONACULAR_API_KEY`

#### Google Gemini API Key
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Add it to your `.env` file as `GEMINI_API_KEY`

### 5. Start the Development Servers

You'll need to run both the frontend and backend servers:

#### Terminal 1 - Backend Server
```bash
npm run server
```

#### Terminal 2 - Frontend Development Server
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run server` - Start the Express backend server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
recipe-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── IngredientSearch.jsx
│   │   ├── RecipeDisplay.jsx
│   │   ├── IngredientList.jsx
│   │   ├── IngredientItem.jsx
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Page components
│   │   └── Dashboard.jsx
│   ├── utils/               # Utility functions
│   └── lib/                 # Library configurations
├── server/                  # Backend Express server
│   └── server.js
├── public/                  # Static assets
└── package.json
```

## API Endpoints

### POST `/api/ingredients-autocomplete`
Searches for ingredients based on user input.

**Request:**
```json
{
  "query": "tomato"
}
```

**Response:**
```json
{
  "ingredients": [
    {
      "id": 11529,
      "name": "tomato",
      "image": "tomato.png"
    }
  ]
}
```

### POST `/api/recipe-generator`
Generates a recipe based on selected ingredients.

**Request:**
```json
{
  "ingredients": ["tomato", "onion", "garlic"]
}
```

**Response:**
```json
{
  "recipe": {
    "recipeName": "Simple Tomato Onion Soup",
    "description": "A comforting soup made with basic ingredients",
    "ingredients": ["2 tomatoes", "1 onion", "2 cloves garlic"],
    "instructions": ["Chop vegetables", "Sauté onions", "Add tomatoes"],
    "cookingTime": "20 minutes",
    "difficulty": "Easy",
    "serves": "2 people",
    "tips": "Add herbs for extra flavor"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

**API Key Errors**
- Ensure your `.env` file is in the root directory
- Verify API keys are correct and active
- Check that you haven't exceeded API rate limits

**CORS Issues**
- The backend includes CORS middleware, but ensure both servers are running
- Frontend should be on port 5173, backend on port 3000

**Build Issues**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version compatibility (v18+)

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are working
3. Ensure both frontend and backend servers are running
4. Check the server logs for backend errors