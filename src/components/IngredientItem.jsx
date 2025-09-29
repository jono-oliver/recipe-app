import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

function IngredientItem({ ingredient, onRemove }) {
  return (
    <article className="group relative bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {ingredient.image && (
            <div className="flex-shrink-0">
              <img 
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
                alt={ingredient.name}
                className="w-10 h-10 rounded-md object-contain bg-muted"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground text-sm truncate">
              {ingredient.name}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Ingredient
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(ingredient.id)}
          className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-150"
          aria-label={`Remove ${ingredient.name} from ingredients`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}

export default IngredientItem;
