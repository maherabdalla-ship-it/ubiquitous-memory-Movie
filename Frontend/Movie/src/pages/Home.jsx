import MovieCard from "../components/MovieCard"
import { useState, useEffect, use } from "react"
import { searchMovies, getPopularMovies } from "../Services/api"
import '../Styles/Home.css'
 
/* Glöm ej 

Lägga till en kommentar knapp inom favorite-sidan
information från Like button och dislike button ska sparas i en .json fil
*/

function Home() {
    const [searchQuery, setSerachQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to Load")
            } 
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handelsearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResult = await searchMovies(searchQuery)
            setMovies(searchResult)
            setError(null)
        } catch (error) {
            console.log(err)
            setError("Failed to find movie . . .")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="home">
            <form onSubmit={handelsearch} className="search-form"> 
                <input type="text" 
                placeholder="Search for Movies..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSerachQuery(e.target.value)}/>
                
                <button type="submit" className="search-button">Search</button>
            </form>

                {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading">loading . . .</div> ):(
                <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                    ))}
            </div>
             )}
        </div>
    )
}

export default Home