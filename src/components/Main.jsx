import {useState} from 'react';
import IngredientsList from './IngredientsList';
import GeminiRecipe from './GeminiRecipe';

export default function Main() {
  const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])
  const [recipeShown, setRecipeShown] = useState(false)

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient").trim()
    if (!newIngredient) return
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  function toggleRecipeShown() {
    setRecipeShown(prevShown => !prevShown)
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

      {ingredients.length > 0 && <IngredientsList ingredients={ingredients} toggleRecipeShown={toggleRecipeShown}/>}

      {recipeShown && <GeminiRecipe/>}
    </main>
  )
}