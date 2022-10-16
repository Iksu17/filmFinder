//Takes the keys in local storage and puts them in their own array. 
const storage = Object.keys(localStorage) 
const apiKey = "ccc34f1"

function removeFromWatchList(){
    localStorage.removeItem(this.id)
    //Refreshes the page. This then clears out the removed items from local storage.
    window.location.reload()
}

//HTML code this function gets called in render movies and will render each saved movie onto the page.
function getMovieHTML(movie){
    document.getElementById("saved-films").innerHTML += `
                                <div class="movie">
                                    <div class="movie-info">
                                        <div class="movie-title">
                                            <h3>${movie.Title}</h3>
                                            <p><img src="img/star.png" alt="star image">${movie.imdbRating}</p>
                                        </div>
                                        <div class="movie-stats">
                                            <p>${movie.Runtime}</p>
                                            <p>${movie.Genre}</p>
                                            <button class="remove-from-watchlist" id="${movie.imdbID}"><img src="img/minus.png" alt="minus image">Remove</button>
                                        </div>
                                        <p>${movie.Plot}</p> 
                                    </div>
                                    
                                    <div class="movie-poster">
                                        <img src="${movie.Poster}" alt="movie poster" class="poster">
                                    </div>  
                                </div> 
                            `
}


//Grabs the array stored in storage made at the 1st line and fethches the movies saved in local storage (ie the watchlist)
function renderMovies(){
        storage.forEach(key=> {
            document.getElementById("saved-films").innerHTML = ""
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${key}`)
                .then (response => response.json())
                .then (movie => {
                    //calls function that has the html code for page
                    getMovieHTML(movie) 
                    
                    //For remove button. When clicked will call the function that removes item from the list. This is a foreach because the movies are fetched rendered on the page via loop. 
                    document.querySelectorAll(".remove-from-watchlist").forEach(button =>{
                        button.addEventListener("click", removeFromWatchList)
                    })
                })
        })
}

renderMovies()