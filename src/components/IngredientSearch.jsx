import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '@/utils/debounce';

function IngredientSearch({ onIngredientSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputContainerRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/ingredients-autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        setSuggestions(data.ingredients || []);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
    setShowSuggestions(value.length > 0);
  };

  // Handle input click to show suggestions if they exist
  const handleInputClick = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle ingredient selection
  const handleIngredientSelect = (ingredient) => {
    onIngredientSelect(ingredient);
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <section className="relative" aria-label="Ingredient search">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-semibold">Enter the ingredients you have...</h2>
      </div>
      <div className="relative" ref={inputContainerRef}>
        <label htmlFor="recipe-input" className="sr-only">
          Search for ingredients
        </label>
        <input
          type="search"
          id="recipe-input"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Start typing to search for ingredients"
          className="w-full px-4 py-4 pr-12 border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-lg bg-background/50 backdrop-blur-sm transition-all duration-200"
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60 pointer-events-none" aria-hidden="true" />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul 
            className="absolute z-10 w-full mt-2 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto"
            role="listbox"
            aria-label="Ingredient suggestions"
          >
            {suggestions.map((ingredient) => (
              <li
                key={ingredient.id}
                onClick={() => handleIngredientSelect(ingredient)}
                className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center gap-3 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                role="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleIngredientSelect(ingredient);
                  }
                }}
              >
                {ingredient.image && (
                  <img 
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} 
                    alt={ingredient.name}
                    className="size-10 rounded-lg shadow-sm object-contain"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-foreground">{ingredient.name}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default IngredientSearch;
