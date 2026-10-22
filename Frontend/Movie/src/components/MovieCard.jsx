import "../Styles/MovieCard.css"

function MovieCard({movie}) {
    function onFavClick() {
        alert("Like click")
    }
    function onDisLikeClick() {
        alert("Dislike click")
    }
    
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={onFavClick}>❤️</button>
                    <button className="dislike-btn" onClick={onDisLikeClick}>💔</button>
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