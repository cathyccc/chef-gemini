import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

app.post('/api/generate-recipe', async (req, res) => {
  const {ingredients} = req.body;

  if(!ingredients || ingredients.length < 4) {
    return res.status(400).json({ error: "You need to add more ingredients." });
  }

  const ingredientsListString = ingredients.join(', ');
  const PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. Your ingredients are ${ingredientsListString}. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Output must be JSON.`;

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
    const recipe = JSON.parse(text);
    
    res.status(200).json(recipe);

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      error: "Failed to generate recipe. Please try again." 
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
