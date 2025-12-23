import {useState} from 'react';

export default function Main() {
  const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])
  
  const listIngredients =
    ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
    ))

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

      {ingredients.length > 0 && <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {listIngredients}
        </ul>
      </section>}
    </main>
  )
}