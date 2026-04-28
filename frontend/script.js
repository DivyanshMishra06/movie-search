// ==================== BASE URL ====================
const base = "https://movie-matrix-1hww.onrender.com";
// Pagination
let currentPage = 1;

// DOM elements
const searchForm = document.querySelector('form');
const searchBox = document.getElementById("searchBox");
const moviesDiv = document.getElementById("movies");

let debounceTimer;

searchBox.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    const query = searchBox.value.trim();

    debounceTimer = setTimeout(() => {
        if (query.length > 2) {
            currentPage = 1;
            searchMovie(currentPage);
        } else if (query.length === 0) {
            fetchTrending();
        }
    }, 500);
});
// TMDB genre IDs
const genres = {
    action: 28,
    comedy: 35,
    romance: 10749,
    drama: 18,
    horror: 27
};

// Industry -> region mapping
const industryRegions = {
    bollywood: "IN",
    hollywood: "US",
    "south indian": "IN"
};

// ==================== SHOW ERROR MESSAGE ====================
function showErrorMessage(message) {
    if(currentPage === 1){
        moviesDiv.innerHTML = `
            <div class="error-message">
                <h2>&#x1F622; ${message}</h2>
                <p>Try searching for another movie or check other categories.</p>
            </div>
        `;
    }
}

// ==================== SHOW MOVIES ====================
function showMovies(movies, append = false) {
    if(!append) moviesDiv.innerHTML = "";
    movies.forEach(movie => {
        const poster = movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";

        const movieCard = `
            <a href="movie.html?id=${movie.id}" class="movie-card">
                <img src="${poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.release_date || ""}</p>
            </a>
        `;
        moviesDiv.innerHTML += movieCard;
    });
}

// ==================== SEARCH MOVIE ====================
async function searchMovie(page = 1) {
    const query = searchBox.value.trim();
    if (!query) return;

    localStorage.setItem("lastSearch", query);

    if(page === 1){
        moviesDiv.innerHTML = `<div class="loader">Loading...</div>`;
    }
    try {
        const res = await fetch(`${base}/search/movie/${encodeURIComponent(query)}?page=${page}`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            showMovies(data.results, page > 1);
        } else {
            if(page === 1) showErrorMessage("Movie not found!!");
        }
    } catch (err) {
        console.log(err);
        showErrorMessage("⚠ Unable to connect to server");
    }
}

// ==================== FETCH TRENDING ====================
async function fetchTrending(page = 1) {
    localStorage.removeItem("lastSearch");
    localStorage.removeItem("lastGenre");
    localStorage.setItem("lastTrending", "true");
    
    if(page === 1){
    moviesDiv.innerHTML = `<div class="loader">Loading...</div>`;
}

    try {
        const url = `${base}/discover/movie?region=IN&with_original_language=hi&sort_by=popularity.desc&page=${page}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            showMovies(data.results, page > 1);
        } else {
            if(page === 1) showErrorMessage("No trending movies found!");
        }
    } catch (err) {
        console.log(err);
        showErrorMessage("⚠ Unable to load trending movies");
    }
}

// ==================== SEARCH CATEGORY / GENRE ====================
async function searchCategory(industry, genreName, page = 1) {
    localStorage.removeItem("lastSearch");
    localStorage.setItem("lastGenre", JSON.stringify({ industry, genreName }));

    const genreId = genres[genreName.toLowerCase()];
    if (!genreId) return showErrorMessage("Genre not found!");

    const region = industryRegions[industry.toLowerCase()] || "IN";
    let language = "en";
    if (industry.toLowerCase() === "bollywood") language = "hi";
    else if (industry.toLowerCase() === "south indian") language = "ta";

    try {
        const url = `${base}/discover/movie?with_genres=${genreId}&region=${region}&with_original_language=${language}&page=${page}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            showMovies(data.results, page > 1);
        } else {
            if(page === 1) showErrorMessage("No movies found in this genre!");
        }
    } catch (err) {
        console.log(err);
        showErrorMessage("⚠ Unable to load movies");
    }
}

// ==================== SHOW GENRE BUTTONS ====================
function showGenres(industry) {
    const genreMenu = document.getElementById("genre-menu");
    genreMenu.innerHTML = `
        <h3>${industry.toUpperCase()}</h3>
        <button onclick="searchCategory('${industry}','action')">Action</button>
        <button onclick="searchCategory('${industry}','horror')">Horror</button>
        <button onclick="searchCategory('${industry}','comedy')">Comedy</button>
        <button onclick="searchCategory('${industry}','romance')">Romance</button>
        <button onclick="searchCategory('${industry}','drama')">Drama</button>
    `;
}

// ==================== FORM SUBMISSION ====================
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = searchBox.value.trim();
    if (movieName !== "") {
        currentPage = 1;
        searchMovie(currentPage);
    } else {
        localStorage.removeItem("lastSearch");
        moviesDiv.innerHTML = "";
        showErrorMessage("Enter movie name to get movie information");
    }
});

// ==================== LOAD MORE BUTTON ====================
document.getElementById("loadMore").addEventListener("click", () => {
    currentPage++;
    const lastSearch = localStorage.getItem("lastSearch");
    const lastGenre = localStorage.getItem("lastGenre");
    const lastTrending = localStorage.getItem("lastTrending");

    if (lastSearch) {
        searchMovie(currentPage);
    } else if (lastGenre) {
        const data = JSON.parse(lastGenre);
        searchCategory(data.industry, data.genreName, currentPage);
    } else if (lastTrending) {
        fetchTrending(currentPage);
    }
});

// ==================== LOAD LAST SEARCH / TRENDING / GENRE ====================
window.addEventListener("load", () => {
    const lastSearch = localStorage.getItem("lastSearch");
    const lastGenre = localStorage.getItem("lastGenre");
    const lastTrending = localStorage.getItem("lastTrending");

    if (lastSearch) {
        searchBox.value = lastSearch;
        searchMovie();
    } else if (lastGenre) {
        const data = JSON.parse(lastGenre);
        searchCategory(data.industry, data.genreName);
    } else if (lastTrending) {
        fetchTrending();
    } else {
        fetchTrending(); // default trending
    }
});