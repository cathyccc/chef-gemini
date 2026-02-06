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
    const newIngredient = formData.get("ingredient").trim();
    if (!newIngredient) return;
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }

  async function generateRecipe() {
    setLoading(true);
    setError('')
    setRecipe(null)

    try {
      const response = await fetch('http://localhost:3000/api/generate-recipe', {
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
    <main className="main">
      <form className="add-ingredient-form" action={handleSubmit}>
        <input
          name="ingredient"
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
        />
        <button>Add Ingredient</button>
      </form>

      {ingredients.length > 0 && <IngredientsList ref={recipeSection}
ingredients={ingredients} generateRecipe={generateRecipe}/>}

      {loading && <h2> Loading... </h2>}
      {!loading && !error && recipe && <GeminiRecipe recipe={recipe}/>}
    </main>
  );
};