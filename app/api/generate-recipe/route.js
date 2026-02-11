import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

export async function POST(req) {
  const {ingredients} = await req.json();

  console.log(ingredients)

  if(!ingredients || ingredients.length < 4) {
    return Response.json(
      { error: "You need to add more ingredients." },
      {status: 400}
    );
  }

  const ingredientsListString = ingredients.join(', ');
  const PROMPT_NEW = `Create a recipe using these ingredients: ${ingredientsListString}.
  IMPORTANT: Return ONLY the raw JSON object. Do not wrap it in markdown code blocks. Do not add any explanation or text before or after the JSON.
  JSON structure:
  {
    "recipeName": "Name of the dish",
    "cookingTime": "Time in minutes",
    "servings": "Number of servings",
    "ingredients": [
      {"name": "ingredient name", "quantity": "amount with unit"}
    ],
    "instructions": [
      "Step 1 description",
      "Step 2 description"
    ]
  }`

  try {
    const response = await ai.models.generateContent({ 
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{text: PROMPT_NEW }] 
      }]
    });

    let text = response.text;
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const recipe = JSON.parse(text);
    return Response.json(recipe, { status: 200 });

  } catch (error) {
    console.error("Gemini Error:", error);
    return Response.json(
      { error: "Failed to generate recipe. Please try again." },
      { status: 500 }
    );
  }
}