const button = document.getElementById('floating-btn')

const addMovie = ()=>{
    //getting elements from the dom
    const inputVal = document.querySelector('input').value
    const text = document.getElementById('text')
    const container = document.querySelector('.container')
    
    // creating list,poster and movie-info divs
    const listDiv = document.createElement('div')
    listDiv.className = 'list'
    const posterDiv = document.createElement('div')
    posterDiv.className = 'poster'
    const movieInfoDiv = document.createElement('div')
    movieInfoDiv.className = 'movie-info'

    // creating h2 for movie title 
    const movieTitle = document.createElement('h2')
    movieTitle.textContent = inputVal

    


    //creating the buttons container div and buttons
    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = 'buttons-conatiner'
    const watched = document.createElement('button')
    watched.className = 'watched-btn'
    watched.textContent = 'watched'
    const del = document.createElement('button')
    del.className = 'del-btn'
    buttonsContainer.appendChild(watched)
    const delIcon = document.createElement('i')
    delIcon.className = 'fa-solid'
    delIcon.classList.add('fa-trash')
    del.appendChild(delIcon)
    buttonsContainer.appendChild(del)

    

    if(!inputVal){
        alert('Please type a movie name first')
    }else{
        //hide the middle text
        text.classList.add('hide')
        
        //start the api call
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=cc340213&t=${inputVal}`)
        .then( resp => resp.json() )
        .then( results => {
            //creating the poster element
            const poster  = document.createElement('img')
            poster.src = results.Poster
        
            //creating h3 for movie relase date
            const releaseDate = document.createElement('h3')
            releaseDate.textContent = `Release Date: ${results.Released}`

            //creating the star ratings
            const starContainer = document.createElement('div')
            starContainer.className = 'star-container' 
            const starIcon = document.createElement('i')
            starIcon.className = 'fa-solid'
            starIcon.classList.add('fa-star')
            const halfStarIcon = document.createElement('i')
            halfStarIcon.className = 'fa-solid'
            halfStarIcon.classList.add('fa-star-half-stroke')

            if(results.Error){
                alert(results.Error)
                //check to not show the text if there are movies alreay
                const lists = document.querySelectorAll('.list')
                if(lists.length > 0){
                    text.classList.add('hide')
                }else{
                    text.classList.remove('hide')
                }
                
                
            }else{
                //poster div
                posterDiv.appendChild(poster)

                //movieinfo div
                movieInfoDiv.appendChild(movieTitle)
                movieInfoDiv.appendChild(releaseDate)
                let rating = results.imdbRating / 2
                for(i=1;i<rating;i++){
                    starContainer.appendChild(starIcon.cloneNode(true))
                    if(rating % 2 !== 0){
                        starContainer.appendChild(halfStarIcon)
                    }
                }
                movieInfoDiv.appendChild(starContainer)
                movieInfoDiv.appendChild(buttonsContainer)

                container.appendChild(listDiv)
                listDiv.appendChild(posterDiv)
                listDiv.appendChild(movieInfoDiv)

                //selecting all delete buttons to start listening to clicks
                const deleteBtns = document.querySelectorAll('.del-btn')
                //adding an event listener on each button
                deleteBtns.forEach( btn => btn.addEventListener('click',deleteMovie))
                
            }
        })
        .catch(e=>console.log(e))

        document.querySelector('input').value=""

    }
}
//listing to clicks on the floating button
button.addEventListener('click', addMovie)

const deleteMovie = (event)=>{

    //getting offsetParent to get the main div where the button lives
    event.target.offsetParent.remove()

    //check if all movies are deleted then display text
    const lists = document.querySelectorAll('.list')
    if(lists.length === 0){
        text.classList.remove('hide')
    }
}