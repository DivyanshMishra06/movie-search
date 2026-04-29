const container = document.getElementById("watchlistMovies");

// ✅ REMOVE FUNCTION
function removeFromWatchlist(id){
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    watchlist = watchlist.filter(movie => movie.id !== id);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    loadWatchlist(); // reload UI
}

// ✅ LOAD WATCHLIST FUNCTION
function loadWatchlist(){
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    container.innerHTML = "";

    if(watchlist.length === 0){
        container.innerHTML = "<h2 style='text-align:center;'>No movies added 😢</h2>";
        return;
    }

    watchlist.forEach(movie=>{
        const poster = movie.poster_path
        ? "https://image.tmdb.org/t/p/w500"+movie.poster_path
        : "https://dummyimage.com/300x450";

     const card = `
    <div class="movie-card">

        <!-- ❌ REMOVE BUTTON -->
        <span class="remove-btn" onclick="event.stopPropagation(); removeFromWatchlist(${movie.id})">❌</span>

        <a href="movie.html?id=${movie.id}" class="movie-link">
            <img src="${poster}">
            <h3>${movie.title}</h3>
        </a>

    </div>
`;

        container.innerHTML += card;
    });
}

// ✅ RUN ON PAGE LOAD
loadWatchlist();