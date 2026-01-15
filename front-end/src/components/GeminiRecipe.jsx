export default function GeminiRecipe({recipe}) {
  function displayIngredients () {
    return recipe.ingredients.map(item => {
      if (item.quantity.includes('to taste')) {
        return <li key={item.name}>{`${item.name.toLowerCase()} ${item.quantity}`}</li>
      } else {
        return <li key={item.name}>{`${item.quantity} ${item.name.toLowerCase()}`}</li>
      }
    })
  }

  function displaySteps () {
    let counter = 0
    return recipe.instructions.map(step => {
      return <li key={counter++}>{step}</li>
    })
  }

  return (
    <section>
      <h2>Chef Gemini Recommends:</h2>
      <article>
        <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>{recipe.recipeName}</strong>. Here is the recipe:</p>
        <h3>{recipe.recipeName}</h3>
        <p>
          <div>Cooking Time: {recipe.cookingTime} mins</div>
          <div>Servings: {recipe.servings}</div>
        </p>

        <div>
          <strong>Ingredients:</strong>
          <ul>
              {displayIngredients()}
          </ul>
        </div>

        <div>
          <strong>Instructions:</strong>
          <ol>
            {displaySteps()}
          </ol>
        </div>
      </article>
    </section>
  )
}