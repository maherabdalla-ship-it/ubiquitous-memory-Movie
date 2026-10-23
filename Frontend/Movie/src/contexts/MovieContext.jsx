/* Global function made to tranfer*/

import { createContext, useState, useContext, useEffect,} from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    const [disLikes, setDisLikes] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        const storedDis = localStorage.getItem("disLikes")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
        if (storedDis) setDisLikes(JSON.parse(storedDis))
    },[])

    useEffect (() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    },[favorites])

    useEffect(() => {
        localStorage.setItem("disLikes", JSON.stringify(disLikes))
    },[disLikes])

    // Favorites Function

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }
    const removeFromFavorites = (movieID) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieID))
    }

    const isFavorites = (movieID) => {
        return favorites.some(movie => movie.id === movieID)
    }
    // Dislike Function

    const addToDisLikes = (movie) => {
        setDisLikes(prev => [...prev, movie])
    }

    const removeFromDisLikes = (movieID) => {
        setDisLikes(prev => prev.filter(movie => movie?.id !== movieID))
    }

    const isDisLikes = (movieID) => {
        return disLikes.some(movie => movie?.id === movieID)
    }


    
    const value = {
        favorites,
        disLikes,
        addToFavorites,
        removeFromFavorites,
        isFavorites,
        addToDisLikes,
        removeFromDisLikes,
        isDisLikes
    }
    
    return (
    <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>)
    
}