const apiKey = "bb335d4eb8c01df91f2c24e5b534ed13";
const params = new URLSearchParams(window.location.search);
const movieID = params.get("id");

// Platform search links
function getProviderLink(name, movieTitle){
    const title = encodeURIComponent(movieTitle);
    if(name.includes("Netflix")) return `https://www.netflix.com/search?q=${title}`;
    if(name.includes("Amazon")) return `https://www.primevideo.com/s?k=${title}`;
    if(name.includes("Hotstar")) return `https://www.hotstar.com/in/search?q=${title}`;
    if(name.includes("Jio")) return `https://www.jiocinema.com/search?q=${title}`;
    return "#";
}

// Error display
function showErrorMessage(message){
    const div = document.getElementById("movieDetails");
    div.innerHTML = `<div class="error-message">${message}</div>`;
}

// Fetch movie details, cast, providers, trailer, similar movies
async function getMovieDetails(){
    try{
        // Movie details
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`);
        const movie = await movieRes.json();

        // Cast
        const castRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`);
        const castData = await castRes.json();

        // Similar movies
        const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${apiKey}`);
        const similarData = await similarRes.json();

        // Watch providers
        const providerRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${apiKey}`);
        const providerData = await providerRes.json();

        // Trailer
        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`);
        const videoData = await videoRes.json();

        showMovieDetails(movie, castData.cast, providerData, videoData.results, similarData.results);
    }catch(err){
        console.log(err);
        showErrorMessage("⚠ Unable to load movie details");
    }
}

// Show movie details
function showMovieDetails(movie, cast, providerData, videos, similar){
    const div = document.getElementById("movieDetails");

    // Trailer key
    let trailerKey = "";
    videos.forEach(v=>{
        if(v.type==="Trailer" && v.site==="YouTube") trailerKey = v.key;
    });

    // Movie poster
    const poster = movie.poster_path ? "https://image.tmdb.org/t/p/w500"+movie.poster_path 
                                      : "https://dummyimage.com/300x450/cccccc/000000&text=No+Poster";

    // Cast HTML
    let castHTML = "";
    cast.slice(0,12).forEach(actor=>{
        const photo = actor.profile_path ? "https://image.tmdb.org/t/p/w200"+actor.profile_path
                                        : "https://dummyimage.com/150x200/cccccc/000000&text=No+Photo";
        castHTML += `
            <div class="actor-card">
                <img src="${photo}">
                <p><strong>${actor.name}</strong></p>
                <p>${actor.character}</p>
            </div>
        `;
    });

    // Providers HTML
    let providerHTML = "";
    if(providerData.results && providerData.results.IN && providerData.results.IN.flatrate){
        providerData.results.IN.flatrate.forEach(p=>{
            const logo = "https://image.tmdb.org/t/p/w200"+p.logo_path;
            const link = getProviderLink(p.provider_name, movie.title);
            providerHTML += `
                <a href="${link}" target="_blank" class="provider-card">
                    <img src="${logo}">
                    <p>${p.provider_name}</p>
                </a>
            `;
        });
    } else providerHTML = "Currently not available on streaming platforms";

    // Trailer HTML
    const trailerHTML = trailerKey ? `
        <h2>Trailer</h2>
        <a href="https://www.youtube.com/watch?v=${trailerKey}" target="_blank">
            <button class="watch-trailer-btn">▶ Watch Trailer on YouTube</button>
        </a>
    ` : `<h2>Trailer</h2><p>Trailer not available</p>`;

    // Similar Movies HTML
    let similarHTML = "";
    if(similar.length>0){
        similarHTML = `<h2>Similar Movies</h2><div class="similar-movies">`;
        similar.forEach(s=>{
            const sPoster = s.poster_path ? "https://image.tmdb.org/t/p/w200"+s.poster_path
                                         : "https://dummyimage.com/200x300/cccccc/000000&text=No+Poster";
            similarHTML += `
                <div class="similar-card" onclick="window.location.href='movie.html?id=${s.id}'">
                    <img src="${sPoster}">
                    <p>${s.title}</p>
                </div>
            `;
        });
        similarHTML += `</div>`;
    }

    // Movie details container
    div.innerHTML = `
        <div class="movie-details">
            <h2>${movie.title}</h2>
            <div class="poster-container">
                <img src="${poster}" alt="${movie.title}">
                ${trailerKey ? `<video src="https://www.youtube.com/embed/${trailerKey}" muted loop></video>` : ""}
            </div>
            <p><strong>Rating ⭐</strong> ${movie.vote_average}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Overview:</strong> ${movie.overview}</p>
            ${trailerHTML}
            <h2>Full Movie Available On</h2>
            <div class="provider-container">${providerHTML}</div>
            <h2>Cast</h2>
            <div class="cast-container">${castHTML}</div>
            ${similarHTML}
        </div>
    `;
}

// Run on load
getMovieDetails();