import {useState} from 'react';
import IngredientsList from './IngredientsList';

export default function Main() {
  const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient").trim()
    if (!newIngredient) return
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
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

      {ingredients.length > 0 && <IngredientsList ingredients={ingredients}/>}
    </main>
  )
}