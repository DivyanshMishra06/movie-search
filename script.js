const apiKey="bb335d4eb8c01df91f2c24e5b534ed13";
const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const searchBox = document.getElementById("searchBox");


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
    bhojpuri: "IN",
    "south indian": "IN"
};



//search movie
async function searchMovie() {
    const query=searchBox.value.trim();
    if(!query) return;
    
    localStorage.setItem("lastSearch",query);
   let url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`; 
   

     let allMovies = await fetchAllMovies(url);
     if (allMovies === null) {
        showErrorMessage(" No Internet Connection");
    }
    if (allMovies.length > 0) {
        showMovies(allMovies);
    } else {
        showErrorMessage("Movie not found!!");
    }
}




function showErrorMessage(message){
    let moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = `
        <div class="error-message">
            <h2>&#x1F622; ${message}</h2>
            <p>Try searching for another movie or check other categories.</p>
        </div>
    `;
}



async function fetchTrending() {

localStorage.removeItem("lastSearch");
localStorage.removeItem("lastGenre");
localStorage.setItem("lastTrending","true");
    const region="IN";
    const language="hi";
   
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=${region}&with_original_language=${language}&sort_by=popularity.desc`;

      let allMovies = await fetchAllMovies(url);
    if (allMovies.length > 0) {
        showMovies(allMovies);
    } else {
        showErrorMessage("No trending movies found!");
    }
}



async function searchCategory(industry, genreName){
    localStorage.removeItem("lastSearch");
localStorage.setItem("lastGenre", JSON.stringify({industry, genreName}));
    const genreId =genres[genreName.toLowerCase()];
    if(!genreId) return showErrorMessage("genre not found!");
    
    const region = industryRegions[industry.toLowerCase()] || "IN"; // for indian movie use
    let language = "en"; // default
if (industry.toLowerCase() === "bollywood") language = "hi";
else if (industry.toLowerCase() === "south indian") language = "ta"; // Tamil as example
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&region=${region}&with_original_language=${language}`;    
let allMovies = await fetchAllMovies(url);
    if (allMovies.length > 0) {
        showMovies(allMovies);
    } else {
        showErrorMessage("No  movies found in this genre!");
    }
}

 function showGenres(industry){

 let genreMenu = document.getElementById("genre-menu");

 genreMenu.innerHTML = `
<h3>${industry.toUpperCase()}</h3>

<button onclick="searchCategory('${industry}','action')">Action</button>
<button onclick="searchCategory('${industry}','horror')">Horror</button>
<button onclick="searchCategory('${industry}','comedy')">Comedy</button>
<button onclick="searchCategory('${industry}','romance')">Romance</button>
<button onclick="searchCategory('${industry}','drama')">Drama</button>
`;

}

//fetch all movies
async function fetchAllMovies(url) {
    let movies = [];
    let page = 1;
    let totalPages = 1;

    try {

        do {
            const res = await fetch(`${url}&page=${page}`);

            if (!res.ok) {
                throw new Error("API request failed");
            }

            const data = await res.json();

            movies = movies.concat(data.results);
            totalPages = data.total_pages;
            page++;

        } while (page <= totalPages && page <= 5);

    } catch (error) {

        console.log("Fetch error:", error);
        return null;
        //showErrorMessage("⚠️ Unable to connect to movie server");

    }

    return movies;
}
function showMovies(movies){
    let moviesDiv=document.getElementById("movies");
    
    moviesDiv.innerHTML="";
    movies.forEach(movie=>{
        let poster=movie.poster_path
        ?"https://image.tmdb.org/t/p/w500" + movie.poster_path:
        "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";

        let movieCard = `
                        <a  href="movie.html?id=${movie.id}" class="movie-card">
                        <img src="${poster}">
                        <h3>${movie.title}</h3>
                        <p>${movie.release_date}</p>
                        </a>
                        `;
                    
moviesDiv.innerHTML+= movieCard;
    });
}

//Movie Details
async function getMovieDetails(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    let response =await fetch(url);
    let data =await response.json();
    showMovieDetails(data);
    
}


// function to handle submission
const handleFormSubmission = (e)=>{
    e.preventDefault();
    const movieName=searchBox.value.trim();
    if(movieName !==''){
        
        localStorage.setItem("lastSearch",movieName); // save search
        searchMovie();

        
    }
    else{
         localStorage.removeItem("lastSearch"); // remove old search
        document.getElementById("movies").innerHTML = "";
        showErrorMessage("Enter movie name to get movie information");

    }
}
//Adding event listener to search form
searchForm.addEventListener('submit',handleFormSubmission);


window.addEventListener("load", function(){

    let lastSearch = localStorage.getItem("lastSearch");
    let lastGenre = localStorage.getItem("lastGenre");
    let lastTrending = localStorage.getItem("lastTrending");
    if(lastSearch){
        searchBox.value = lastSearch;
       searchMovie();
    }
    else if(lastGenre){

let data = JSON.parse(lastGenre);
searchCategory(data.industry, data.genreName);

}

else if(lastTrending){
    fetchTrending();
}

});