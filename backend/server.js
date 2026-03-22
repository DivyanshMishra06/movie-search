// backend/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());

// TMDB API key from .env
const API_KEY = process.env.TMDB_API_KEY.trim();
const PORT = process.env.PORT || 3000;

console.log("Server starting...");
console.log("Using TMDB API Key:", API_KEY);

// ===== Movie by ID =====
app.get("/tmdb/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// ===== Search movies =====
app.get("/tmdb/search/movie/:query", async (req, res) => {
  const { query } = req.params;
  const page = req.query.page || 1;
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// ===== Movie sub endpoints =====
app.get("/tmdb/movie/:id/:sub", async (req, res) => {
  const { id, sub } = req.params;
  try {
    if (sub === "watch/providers")
      return res.status(400).json({ error: "Use /tmdb/movie/:id/watch/providers for providers" });

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/${sub}?api_key=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch ${sub}` });
  }
});

// ===== Watch providers (default IN, fallback US) =====
app.get("/tmdb/movie/:id/watch/providers", async (req, res) => {
  const { id } = req.params;
  const region = "IN";
  try {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}&region=${region}`);
    let data = await response.json();

    if (!data.results || !data.results[region]) {
      response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}&region=US`);
      data = await response.json();
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watch providers" });
  }
});

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

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch discover movies" });
  }
});

// ===== Test route =====
app.get("/test", async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.send("Error fetching test movie");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));