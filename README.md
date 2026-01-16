# 🍳 Gemini Recipe Generator

An AI-powered kitchen assistant that turns your random ingredients into delicious meals. This application uses a **React** frontend and an **Express** backend to securely communicate with the **Google Gemini 3 Flash** model.



## 📂 Project Structure
```text
chef-gemini/
├── .env           # Root environment variables (Shared)
├── front-end/     # React + Vite UI (Main Dev Entry)
│   └── package.json
└── server/        # Express + Node.js Backend
    └── package.json
```
---

## 🛠️ Tech Stack

### 🖥️ Frontend
* **React & Vite**: Powering a fast, modern, and reactive user interface.
* **Basic CSS**: Custom-crafted styling for a clean and intuitive layout.

### ⚙️ Backend
* **Node.js & Express**: Robust server-side logic and efficient API routing.
* **CORS**: Middleware configured to allow secure communication between the frontend and server.
* **DotEnv**: Secure environment variable management to protect sensitive credentials.

### 🧠 AI Engine
* **Model**: `gemini-3-flash-preview` (Google's latest 2026 reasoning model).
* **SDK**: `@google/genai` (The new unified Google AI SKD).
---

## ✨ Features & AI Logic
* **🥗 Ingredient Maximization**: Specifically tuned to utilize as many of your provided ingredients as possible.
* **⚡ Gemini 3 "Thinking" Mode**: Leverages the model's native reasoning to plan flavor profiles before generating steps, ensuring higher culinary accuracy.
* **🔍 Smart Filtering**: Requires a minimum of **4 ingredients** to ensure the AI has enough context to generate a high-quality, valid recipe.
* **🛡️ Secure Architecture**: API logic stays on the server to prevent your keys from being exposed in the browser.

🛠️ Key API Endpoints
* `POST /generate-recipe`: Accepts an array of ingredients and returns a formatted JSON recipe.

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/cathyccc/chef-gemini.git](https://github.com/cathyccc/chef-gemini.git)
cd chef-gemini
```
### 2. Configure Environment Variables
Create a `.env` file in the **root** folder:
```code
PORT=5000
GEMINI_API_KEY=your_actual_key_here
```

### 3. Install Dependencies
You need to install dependencies in both the frontend and server folders:
```bash
# Install backend
cd server && npm install

# Install frontend
cd ../front-end && npm install
```

### 4. Run the Full Stack
This project is configured to launch both the frontend and backend from the front-end directory:

```bash
cd front-end
npm run dev:all
```
---

### 📄 License
This project is open-source and available under the *MIT License*.
