module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/generate-recipe/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
(()=>{
    const e = new Error("Cannot find module '@google/genai'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
async function POST(req) {
    const { ingredients } = await req.json();
    if (!ingredients || ingredients.length < 4) {
        return Response.json({
            error: "You need to add more ingredients."
        }, {
            status: 400
        });
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
  }`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: PROMPT_NEW
                        }
                    ]
                }
            ]
        });
        let text = response.text;
        const recipe = JSON.parse(text);
        Response.status.json(recipe, {
            status: 200
        });
    } catch (error) {
        console.error("Gemini Error:", error);
        Response.json({
            error: "Failed to generate recipe. Please try again."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__54bc1541._.js.map