import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function RecipeDisplay({ generatedRecipe, recipeError, isGenerating, onRetry }) {
  if (isGenerating) {
    return (
      <article className="mx-auto max-w-4xl">
        <div className="mb-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Generating Recipe...</h2>
          </header>
          <div className="text-center py-12" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" aria-hidden="true" />
              <div className="text-lg font-medium text-foreground">Generating your recipe...</div>
              <p className="text-sm text-muted-foreground">This may take a few moments</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (recipeError) {
    return (
      <article className="mx-auto max-w-4xl">
        <div className="mb-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Generated Recipe</h2>
          </header>
          <div className="text-center py-8" role="alert">
            <div className="text-destructive mb-2">Error generating recipe</div>
            <p className="text-muted-foreground">{recipeError}</p>
            <Button 
              onClick={onRetry} 
              className="mt-4"
              disabled={isGenerating}
            >
              Try Again
            </Button>
          </div>
        </div>
      </article>
    );
  }

  if (!generatedRecipe) {
    return null;
  }

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold">Generated Recipe</h2>
        </header>
        <div className="prose prose-sm max-w-none">
          <header>
            <h2 className="text-2xl font-bold text-foreground mb-4">{generatedRecipe.recipeName}</h2>
            <p className="text-muted-foreground mb-6">{generatedRecipe.description}</p>
          </header>
          
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">Recipe Info</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-foreground font-medium">Cooking Time:</dt>
                  <dd className="text-muted-foreground">{generatedRecipe.cookingTime}</dd>
                </div>
                <div>
                  <dt className="text-foreground font-medium">Difficulty:</dt>
                  <dd className="text-muted-foreground">{generatedRecipe.difficulty}</dd>
                </div>
                <div>
                  <dt className="text-foreground font-medium">Serves:</dt>
                  <dd className="text-muted-foreground">{generatedRecipe.serves}</dd>
                </div>
              </dl>
            </section>
          </div>
          
          <section className="mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Instructions</h3>
            <ol className="space-y-3">
              {generatedRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </section>
          
          {generatedRecipe.tips && (
            <aside className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">Tips</h3>
              <p className="text-muted-foreground">{generatedRecipe.tips}</p>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeDisplay;
