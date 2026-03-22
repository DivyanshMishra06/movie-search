// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY?.trim();
const PORT = process.env.PORT || 3000;

if (!API_KEY) {
  console.error("TMDB_API_KEY missing in .env!");
  process.exit(1); // stop server if API key missing
}

console.log("Server starting...");
console.log("Using TMDB API Key:", API_KEY);

// ===== Discover movies =====
app.get("/tmdb/discover/movie", async (req, res) => {
  const { with_genres, region, with_original_language, sort_by, page } = req.query;

  try {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    if (with_genres) url += `&with_genres=${with_genres}`;
    if (region) url += `&region=${region}`;
    if (with_original_language) url += `&with_original_language=${with_original_language}`;
    if (sort_by) url += `&sort_by=${sort_by}`;
    if (page) url += `&page=${page}`;

    console.log("Fetching URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error in /tmdb/discover/movie:", err);
    res.status(500).json({ error: "Failed to fetch discover movies", details: err.message });
  }
});

// ===== Test route =====
app.get("/test", async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error in /test:", err);
    res.status(500).json({ error: "Error fetching test movie", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running! Use /test or other TMDB routes.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));