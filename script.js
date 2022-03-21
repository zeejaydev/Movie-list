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
        text.classList.add('hide')
        
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=cc340213&t=${inputVal}`)
        .then( resp => resp.json() )
        .then( results => {
            //creating the poster element
            const poster  = document.createElement('img')
            poster.src = results.Poster
        
            //creating h3 for movie relase date
            const releaseDate = document.createElement('h3')
            releaseDate.textContent = `Release Date: ${results.Released}`

            if(results.Error){
                alert(results.Error)
                text.classList.remove('hide')
                
            }else{
                //poster div
                // const poster  = document.createElement('img')
                // poster.src = 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg'
                posterDiv.appendChild(poster)

                //movieinfo div
                movieInfoDiv.appendChild(movieTitle)
                movieInfoDiv.appendChild(releaseDate)
                movieInfoDiv.appendChild(buttonsContainer)

                container.appendChild(listDiv)
                listDiv.appendChild(posterDiv)
                listDiv.appendChild(movieInfoDiv)

            }
        })
        .catch(e=>console.log(e))

       
        //poster div
        // const poster  = document.createElement('img')
        // poster.src = 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg'
        // posterDiv.appendChild(poster)

        //movieinfo div
        // movieInfoDiv.appendChild(movieTitle)
        // movieInfoDiv.appendChild(buttonsContainer)

        // container.appendChild(listDiv)
        // listDiv.appendChild(posterDiv)
        // listDiv.appendChild(movieInfoDiv) 

        document.querySelector('input').value=""

    }
}

button.addEventListener('click', addMovie)