import '../Styles/Fav.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'
import { useState } from 'react'

function Favorite() {
    const {favorites, disLikes} = useMovieContext()
    const [selectedMovie,setSelectedMovie] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [comment, setComment] = useState("")

    function handelSelect(movie) {
        setSelectedMovie(movie)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!selectedMovie) {
            alert("Please select a Movie first")
            return
        }

        const reviewData = {
            movieid: selectedMovie.id,
            movieTitle: selectedMovie.title,
            firstName,
            lastName,
            comment
        }

        console.log(reviewData)
        
        try {
            const response = await fetch('http://localhost:5000/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.Error||"Failed to send");
            }
            alert('Comment sent successfully!')

            setFirstName('')
            setLastName('')
            setComment('')
            setSelectedMovie(null)
        } catch (error) {
            console.error('Error:', error)
            alert('Could not send comment to backend')
        } 
    }

    if (favorites.length === 0 && disLikes.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>No favorites</h2>
            </div>
        )        
    } else {
        return (
            <div className='fav-container'>
                <div className='favorites'>
                    <h2>Your Favorites Movie(s)</h2>
                    <div className='movies-grid'>
                    {favorites.map((movie) => (
                        <div key={movie.id} className='movie-item'>
                          
                            <MovieCard movie={movie} key={movie.id} />
                            <button className={`comment-btn ${selectedMovie?.id === movie.id ? "active": ""}`} onClick={() => handelSelect(movie)}>Comment Here</button>
                        </div>  
                            ))}
                    </div>
                    
                </div>
                <div className='dislike'>
                    <h2>Your Disliked Movie(s)</h2>
                    <div className='movies-grid'>
                    {disLikes.map((movie) => (
                        <div key={movie.id} className='movie-item'>
                          
                            <MovieCard movie={movie} key={movie?.id} />
                            <button className={`comment-btn ${selectedMovie?.id === movie.id ? "active": ""}`} onClick={() => handelSelect(movie)}>Comment Here</button>
                        </div> 
                        ))}
                    </div>
                </div>
                <br />
                <div>
                    <h2>Write a Review</h2>
                    <p>
                        Selected movie:{""}{
                            selectedMovie ? selectedMovie.title : ` No movie selected`
                        }
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fname"> First Name </label>
                            <input type="text" id='fname' value={firstName} onChange={e => setFirstName(e.target.value)}required />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="lname"> Last Name </label>
                            <input type="text" id='lname' value={lastName} onChange={e => setLastName(e.target.value)} required/>                        
                        </div> 
                        <br />
                        <div>
                            <label htmlFor="comment"> Comment </label>
                            <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} rows={5} cols={60}></textarea>
                        </div>
                        <input type="reset" />
                        <button type='submit' disabled={!selectedMovie}> Submit Review </button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Favorite