import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CookingPot, RotateCcw } from 'lucide-react';
import IngredientItem from './IngredientItem';

function IngredientList({ 
  selectedIngredients, 
  onRemoveIngredient, 
  onGenerateRecipe, 
  onResetRecipe,
  isGenerating,
  generatedRecipe,
  recipeError 
}) {
  return (
    <aside className="w-full lg:w-96 bg-card/30 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-border flex flex-col lg:h-screen lg:sticky lg:top-0">
      {/* Header */}
      <header className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold">
          Ingredient List
        </h2>
      </header>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <section className="space-y-3" aria-label="Selected ingredients">
          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 ? (
            selectedIngredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                ingredient={ingredient}
                onRemove={onRemoveIngredient}
              />
            ))
          ) : (
            <Card className="bg-card/30 backdrop-blur-sm border-dashed border-border">
              <CardContent className="p-6 text-center">
                <CookingPot className="h-12 w-12 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
                <p className="text-sm text-muted-foreground mb-1">No ingredients selected yet</p>
                <p className="text-xs text-muted-foreground">Start typing to search for ingredients</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
      
      {/* Fixed Buttons at Bottom */}
      <footer className="p-6 border-t border-border bg-card/30 backdrop-blur-sm space-y-3">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
          disabled={selectedIngredients.length === 0 || isGenerating}
          onClick={onGenerateRecipe}
          aria-describedby={selectedIngredients.length === 0 ? "no-ingredients-help" : undefined}
        >
          <CookingPot className="h-4 w-4 mr-2" aria-hidden="true" />
          {isGenerating ? 'Generating Recipe...' : `Generate Recipe (${selectedIngredients.length} ingredients)`}
        </Button>
        {selectedIngredients.length === 0 && (
          <p id="no-ingredients-help" className="sr-only">
            You need to select at least one ingredient to generate a recipe
          </p>
        )}
        
        {(generatedRecipe || recipeError) && !isGenerating && (
          <Button
            variant="outline"
            size="lg"
            onClick={onResetRecipe}
            className="w-full flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Start New Recipe
          </Button>
        )}
      </footer>
    </aside>
  );
}

export default IngredientList;
