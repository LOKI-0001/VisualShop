const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// === FILL THESE IN FROM YOUR CLARIFAI PORTAL ===
const USER_ID = "x0bunsxraiic";
const APP_ID = "VisualShop";
const CLARIFAI_API_KEY = "f44e5755b4324b2bb835fbb91ec9e388";
// ===============================================

const MODEL_ID = "general-image-recognition";
const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";

app.post("/clarifai", async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const clarifaiBody = {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      ...req.body,
    };

    console.log("Clarifai request body:", clarifaiBody);

    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${CLARIFAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clarifaiBody),
      }
    );
    const data = await response.json();
    console.log("Clarifai API response:", data);
    res.json(data);
  } catch (error) {
    console.error("Clarifai API error:", error);
    res.status(500).json({ error: "Clarifai API error", details: error.message });
  }
});
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Proxy server running on http://localhost:${PORT}`);
// });

// Add this near the other routes in server.js

const SERPAPI_KEY = "6b8e209f73d6b4a5d8b276121e8c10ad4dec40b9d4bd10ab533b9950de32bf13"; // <-- put your SerpAPI key here

app.post("/search", async (req, res) => {
  const { query } = req.body;
  try {
   const url = `https://serpapi.com/search.json?engine=amazon&k=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;
     const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });
    const data = await response.json();
    console.log("Received query:", query);
console.log("SerpAPI URL:", url);
console.log("SerpAPI response:", data);

    // Only send the relevant results array
    res.json({ organic_results: data.organic_results || [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from SerpAPI" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
