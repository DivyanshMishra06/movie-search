// ==================== server.js ====================
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY?.trim();
const PORT = process.env.PORT || 3000;

if (!API_KEY) {
  console.error("❌ TMDB_API_KEY missing in .env!");
  process.exit(1);
}

console.log("🚀 Server starting...");
console.log("🔑 Using TMDB API Key:", API_KEY);

// ==================== SEARCH MOVIES ====================
// app.get("/tmdb/search/movie", async (req, res) => {
//   const { query, page } = req.query;

//   try {
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

//     if (query) url += `&query=${encodeURIComponent(query)}`;
//     if (page) url += `&page=${page}`;

//     console.log("🔍 Fetching:", url);

//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`TMDB error ${response.status}`);

//     const data = await response.json();
//     res.json(data);

//   } catch (err) {
//     console.error("❌ Search Error:", err);
//     res.status(500).json({ error: "Search failed", details: err.message });
//   }
// });
// ===== SEARCH MOVIES =====
app.get("/tmdb/search/movie/:query", async (req, res) => {
  const query = req.params.query;
  const page = req.query.page || 1;

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;

    console.log("Search URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("TMDB API Error");
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});
// ==================== DISCOVER MOVIES ====================
app.get("/tmdb/discover/movie", async (req, res) => {
  const { with_genres, region, with_original_language, sort_by, page } = req.query;

  try {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

    if (with_genres) url += `&with_genres=${with_genres}`;
    if (region) url += `&region=${region}`;
    if (with_original_language) url += `&with_original_language=${with_original_language}`;
    if (sort_by) url += `&sort_by=${sort_by}`;
    if (page) url += `&page=${page}`;

    console.log("🎬 Fetching:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`TMDB error ${response.status}`);

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("❌ Discover Error:", err);
    res.status(500).json({ error: "Discover failed", details: err.message });
  }
});

// ==================== MOVIE DETAILS ====================
// app.get("/tmdb/movie/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);

//   } catch (err) {
//     res.status(500).json({ error: "Movie details failed" });
//   }
// });
app.get("/tmdb/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("TMDB error");

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Movie details failed" });
  }
});
// ==================== MOVIE CREDITS ====================
app.get("/tmdb/movie/:id/credits", async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Credits fetch failed" });
  }
});

// ==================== SIMILAR MOVIES ====================
app.get("/tmdb/movie/:id/similar", async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Similar movies failed" });
  }
});

// ==================== WATCH PROVIDERS ====================
app.get("/tmdb/movie/:id/watch/providers", async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Providers fetch failed" });
  }
});

// ==================== MOVIE VIDEOS ====================
app.get("/tmdb/movie/:id/videos", async (req, res) => {
  const { id } = req.params;

  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Videos fetch failed" });
  }
});

// ==================== TEST ROUTE ====================
app.get("/test", async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Test failed" });
  }
});

// ==================== ROOT ====================
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully 🚀");
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const fetch = require("node-fetch");

// const app = express();
// app.use(cors());

// const API_KEY = process.env.TMDB_API_KEY?.trim();
// const PORT = process.env.PORT || 3000;

// if (!API_KEY) {
//   console.error("TMDB_API_KEY missing in .env!");
//   process.exit(1); // stop server if API key missing
// }

// console.log("Server starting...");
// console.log("Using TMDB API Key:", API_KEY);

// // ==================== SEARCH MOVIES ====================
// app.get("/tmdb/search/movie", async (req, res) => {
//   const { query, page } = req.query;

//   try {
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

//     if (query) url += `&query=${encodeURIComponent(query)}`;
//     if (page) url += `&page=${page}`;

//     console.log("🔍 Fetching:", url);

//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`TMDB error ${response.status}`);

//     const data = await response.json();
//     res.json(data);

//   } catch (err) {
//     console.error("❌ Search Error:", err);
//     res.status(500).json({ error: "Search failed", details: err.message });
//   }
// });


// // ===== Discover movies =====
// app.get("/tmdb/discover/movie", async (req, res) => {
//   const { with_genres, region, with_original_language, sort_by, page } = req.query;

//   try {
//     let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
//     if (with_genres) url += `&with_genres=${with_genres}`;
//     if (region) url += `&region=${region}`;
//     if (with_original_language) url += `&with_original_language=${with_original_language}`;
//     if (sort_by) url += `&sort_by=${sort_by}`;
//     if (page) url += `&page=${page}`;

//     console.log("Fetching URL:", url);

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Error in /tmdb/discover/movie:", err);
//     res.status(500).json({ error: "Failed to fetch discover movies", details: err.message });
//   }
// });

// // ===== Test route =====
// app.get("/test", async (req, res) => {
//   try {
//     const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Error in /test:", err);
//     res.status(500).json({ error: "Error fetching test movie", details: err.message });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Backend is running! Use /test or other TMDB routes.");
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// // // backend/server.js
// // const express = require("express");
// // const cors = require("cors");
// // require("dotenv").config();
// // const fetch = require("node-fetch");

// // const app = express();
// // app.use(cors());

// // const API_KEY = process.env.TMDB_API_KEY?.trim();
// // const PORT = process.env.PORT || 3000;

// // if (!API_KEY) {
// //   console.error("TMDB_API_KEY missing in .env!");
// //   process.exit(1);
// // }

// // console.log("Server starting...");
// // console.log("Using TMDB API Key:", API_KEY);

// // // ===== SEARCH MOVIES =====
// // app.get("/tmdb/search/movie", async (req, res) => {
// //   const { query, page } = req.query;

// //   try {
// //     let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

// //     if (query) url += `&query=${encodeURIComponent(query)}`;
// //     if (page) url += `&page=${page}`;

// //     console.log("Fetching URL:", url);

// //     const response = await fetch(url);
// //     const data = await response.json();

// //     res.json(data);
// //   } catch (err) {
// //     console.error("Search Error:", err);
// //     res.status(500).json({ error: "Search failed" });
// //   }
// // });

// // // ===== DISCOVER MOVIES =====
// // app.get("/tmdb/discover/movie", async (req, res) => {
// //   const { with_genres, region, with_original_language, sort_by, page } = req.query;

// //   try {
// //     let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

// //     if (with_genres) url += `&with_genres=${with_genres}`;
// //     if (region) url += `&region=${region}`;
// //     if (with_original_language) url += `&with_original_language=${with_original_language}`;
// //     if (sort_by) url += `&sort_by=${sort_by}`;
// //     if (page) url += `&page=${page}`;

// //     console.log("Fetching URL:", url);

// //     const response = await fetch(url);
// //     const data = await response.json();

// //     res.json(data);
// //   } catch (err) {
// //     console.error("Discover Error:", err);
// //     res.status(500).json({ error: "Discover failed" });
// //   }
// // });

// // // ===== TEST ROUTE =====
// // app.get("/test", async (req, res) => {
// //   try {
// //     const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
// //     const response = await fetch(url);
// //     const data = await response.json();
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ error: "Test failed" });
// //   }
// // });

// // // ===== ROOT =====
// // app.get("/", (req, res) => {
// //   res.send("Backend is running!");
// // });

// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // backend/server.js
// // const express = require("express");
// // const cors = require("cors");
// // require("dotenv").config();

// // const app = express();
// // app.use(cors());

// // const API_KEY = process.env.TMDB_API_KEY?.trim();
// // const PORT = process.env.PORT || 3000;

// // if (!API_KEY) {
// //   console.error("TMDB_API_KEY missing in .env!");
// //   process.exit(1);
// // }

// // console.log("Server starting...");
// // console.log("Using TMDB API Key:", API_KEY);

// // // ===== SEARCH MOVIES =====
// // app.get("/tmdb/search/movie", async (req, res) => {
// //   const { query, page } = req.query;

// //   try {
// //     let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

// //     if (query) url += `&query=${encodeURIComponent(query)}`;
// //     if (page) url += `&page=${page}`;

// //     console.log("Fetching:", url);

// //     const response = await fetch(url);
// //     const data = await response.json();

// //     res.json(data);
// //   } catch (err) {
// //     console.error("Search Error:", err);
// //     res.status(500).json({ error: "Search failed", details: err.message });
// //   }
// // });

// // // ===== DISCOVER MOVIES =====
// // app.get("/tmdb/discover/movie", async (req, res) => {
// //   const { with_genres, region, with_original_language, sort_by, page } = req.query;

// //   try {
// //     let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

// //     if (with_genres) url += `&with_genres=${with_genres}`;
// //     if (region) url += `&region=${region}`;
// //     if (with_original_language) url += `&with_original_language=${with_original_language}`;
// //     if (sort_by) url += `&sort_by=${sort_by}`;
// //     if (page) url += `&page=${page}`;

// //     console.log("Fetching:", url);

// //     const response = await fetch(url);
// //     const data = await response.json();

// //     res.json(data);
// //   } catch (err) {
// //     console.error("Discover Error:", err);
// //     res.status(500).json({ error: "Discover failed", details: err.message });
// //   }
// // });

// // // ===== TEST =====
// // app.get("/test", async (req, res) => {
// //   try {
// //     const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
// //     const response = await fetch(url);
// //     const data = await response.json();
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ error: "Test failed" });
// //   }
// // });

// // app.get("/", (req, res) => {
// //   res.send("Backend running successfully 🚀");
// // });

// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));