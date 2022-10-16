let movieTitle = []
const apiKey = "ccc34f1"


function addToWatchList(){
    localStorage.setItem(this.id, this.id)
}



document.getElementById("new-search").addEventListener("submit", (e)=>{
    e.preventDefault()
    
    //clear the movieTitle array and the DOM of previous search
    document.getElementById("search-results").innerHTML = ""
    movieTitle = []
    
    
    //Grabs the search query user types into the search bar
    const searchQuery = document.getElementById("search").value
    //console.log(searchQuery)
    
    //Adds search value to fetch query and sends request to API
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
        .then (response => response.json())
        .then (data => {
            //grabing just the search results from the request 
            //basicly simplifying the array
            let movieSearch = data.Search
            
            //pulling the title names from the search 
            //and putting them in an array
            for (i = 0; i < movieSearch.length; i++){
                    movieTitle.push(movieSearch[i].Title)
                }
                
            //turning off the empty-watchlist div element
            document.getElementById("empty-watchlist").style.display = "none"
            
            //doing another fetch request. This is needed to get full info array of each movie.
            //I am mapping over the movieTitle array and requesting full details for each movie.
            movieTitle.map(name => {
                fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${name}`)
                    .then (response => response.json())
                    .then (movie => {
                        //Builds the div element for each movie
                        document.getElementById("search-results").innerHTML += `
                                <div class="movie">
                                    <div class="movie-info">
                                        <div class="movie-title">
                                            <h3>${movie.Title}</h3>
                                            <p><img src="img/star.png" alt="star image">${movie.imdbRating}</p>
                                        </div>
                                        <div class="movie-stats">
                                            <p>${movie.Runtime}</p>
                                            <p>${movie.Genre}</p>
                                            <button class="add-to-watchlist" id="${movie.imdbID}"><img src="img/plus.png" alt="star image">Watchlist</button>
                                        </div>
                                        <p>${movie.Plot}</p> 
                                    </div>
                                    
                                    <div class="movie-poster">
                                        <img src="${movie.Poster}" alt="movie poster" class="poster">
                                    </div>  
                                </div> 
                            `
                            //For add to watchlist button. It is a foreach because all of the movies are fetched and rendered via loop and this will iterate throug the list and find the button associated with the particular movie
                            document.querySelectorAll(".add-to-watchlist").forEach(button =>{
                                button.addEventListener("click", addToWatchList)
                            })
                            
                    })
                    
            })
        })
})


