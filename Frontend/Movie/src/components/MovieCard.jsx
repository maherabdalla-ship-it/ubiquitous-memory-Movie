import "../Styles/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie}) {
    const {isFavorites, addToFavorites, removeFromFavorites, isDisLikes, addToDisLikes, removeFromDisLikes} = useMovieContext()
    const favorite = isFavorites(movie.id)
    const dislike = isDisLikes(movie.id)

    function onFavClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
    function onDisLikeClick(e) {
        e.preventDefault()
        if (dislike) {
            removeFromDisLikes(movie.id)
        } else {
            addToDisLikes(movie)
        }
    }
    
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavClick}>❤️</button>
                    <button className={`dislike-btn ${dislike ? "active" : ""}`} onClick={onDisLikeClick}>💔</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>

        </div>
    )
}

export default MovieCard