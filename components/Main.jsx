"use client"

import {useState, useRef, useEffect} from 'react';
import IngredientsList from './IngredientsList';
import GeminiRecipe from './GeminiRecipe';

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const recipeSection = useRef(null)

  useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({behaviour: 'smooth'})
    }
  }, [recipe])

  function handleSubmit(formData) {    
    const newIngredient = formData.get("ingredient").trim().toLowerCase();
    const onlyLetters = /^[A-Za-z\s]+$/;
    if (!newIngredient) return;
    if (!onlyLetters.test(newIngredient)) return setError("Please use letters only (no numbers or special characters).");
    if (ingredients.includes(formData.get("ingredient").trim().toLowerCase())) return setError('Ingredient already exists.');
    
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }

  async function generateRecipe() {
    setLoading(true);
    setError('')
    setRecipe(null)

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingredients: ingredients})
      });
      const recipe = await response.json();
      setRecipe(recipe)
    } catch (err) {
      setError ('Something went wrong. Please try again.')
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 flex flex-col max-w-2xl mx-auto">
      <div className="text-center">
        <div className="mb-3">List at least 4 ingredients for our Chef Gemini to generate a recipe.</div>
        <form className="flex justify-center gap-3 h-[38px]" action={handleSubmit}>
          <input
            name="ingredient"
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            className="grow min-w-[150px] max-w-[400px] rounded-md border border-[#D1D5DB] px-[13px] py-[9px] shadow-sm outline-none"
          />
          <button className="w-[150px] bg-[#141413] text-[#FAFAF8] rounded-md text-sm font-medium font-sans flex items-center justify-center border-none cursor-pointer hover:bg-black transition-colors mr-[5px]">Add Ingredient</button>
        </form>
        <div className="mr-40 pt-2 text-sm text-red-800">{error}</div>
      </div>

      
      {ingredients.length > 0 && 
        <IngredientsList ref={recipeSection} ingredients={ingredients} generateRecipe={generateRecipe}/>
      }

      {loading && <h2> Loading... </h2>}
      {!loading && !error && recipe && <GeminiRecipe recipe={recipe}/>}
    </main>
  );
};