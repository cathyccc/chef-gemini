export default function IngredientsList (props) {
  const listIngredients =
    props.ingredients.map(ingredient => (
      <li className="list-inside" key={ingredient}>{ingredient}</li>
    ))

  return (
      <section className="">
        <h2 className="font-semibold mt-3">Ingredients on hand:</h2>
        <ul className="list-disc" aria-live="polite">
          {listIngredients}
        </ul>

        {props.ingredients.length > 3 && 
          <div className="my-6 p-5 bg-[#F0EFEB] flex justify-between items-center rounded-lg px-7 py2.5">
            <div ref={props.ref}>
                <h3 className="text-lg font-medium leading-6">Ready for a recipe?</h3>
                <p className="text-gray-500 text-sm leading-5">Generate a recipe from your list of ingredients.</p>
            </div>
            <button className="border-none rounded-md bg-[#D17557] shadow-sm text-[#FAFAF8] py-[9px] px-[17px] text-sm cursor-pointer font-sans" onClick={props.generateRecipe}>Get a recipe</button>
          </div>}
      </section>
  )
}