import React, { useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { CookingPot } from 'lucide-react';
import IngredientSearch from '@/components/IngredientSearch';
import RecipeDisplay from '@/components/RecipeDisplay';
import IngredientList from '@/components/IngredientList';

function Dashboard() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [recipeError, setRecipeError] = useState(null);

  // Handle ingredient selection from search
  const handleIngredientSelect = (ingredient) => {
    if (!selectedIngredients.find(item => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Remove ingredient
  const removeIngredient = (ingredientId) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredientId));
  };

  // Reset everything to start a new recipe
  const resetRecipe = () => {
    setSelectedIngredients([]);
    setGeneratedRecipe(null);
    setRecipeError(null);
    setIsGenerating(false);
  };

  // Generate recipe
  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsGenerating(true);
    setRecipeError(null);
    setGeneratedRecipe(null);

    try {
      const response = await fetch('http://localhost:3000/api/recipe-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ingredients: selectedIngredients.map(ingredient => ingredient.name) 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedRecipe(data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setRecipeError('Failed to generate recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex flex-col lg:flex-row">
      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CookingPot className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Scavengr
              </h1>
            </div>
            <ModeToggle />
          </header>
          
          {/* Search Section */}
          {!generatedRecipe && !isGenerating && (
            <IngredientSearch onIngredientSelect={handleIngredientSelect} />
          )}
        </div>

        {/* Generated Recipe Section */}
        <RecipeDisplay 
          generatedRecipe={generatedRecipe}
          recipeError={recipeError}
          isGenerating={isGenerating}
          onRetry={generateRecipe}
        />
      </main>

      {/* Right Sidebar */}
      <IngredientList
        selectedIngredients={selectedIngredients}
        onRemoveIngredient={removeIngredient}
        onGenerateRecipe={generateRecipe}
        onResetRecipe={resetRecipe}
        isGenerating={isGenerating}
        generatedRecipe={generatedRecipe}
        recipeError={recipeError}
      />
    </div>
  );
}

export default Dashboard;