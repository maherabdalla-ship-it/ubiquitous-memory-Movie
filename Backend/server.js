import express from 'express';
import cors from "cors"

const app = express()

const PORT = 5000;

app.use(cors())
app.use(express.json());

let favorites = [];
let dislikes = [];
let reviews = [];


app.get('/', (req, res) => {
    res.send('Welcome to TaskMaster API');
});

// lägg till en review
app.post('/comment', (req, res) => {
    const {
        movieid,
        movieTitle,
        firstName,
        lastName,
        comment
    } = req.body
    
    if (movieid == null ||!firstName?.trim() || !lastName?.trim() || !comment?.trim()) {
        return res.status(400).json({
            error: "Emtpy or missing Field"   
        })
    }

    const review = {
        id: Date.now(),
        movieid,
        movieTitle,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        comment: comment.trim()
    }

    reviews.push(review)

        console.log('New review:', review)

    res.status(201).json({
        message: 'Review received successfully',
        review
    })
})

// Hämta gillade filmer
app.get('/favorites', (req, res) => {
    res.json(favorites);
});

// Lägg till en gillad film
app.post('/favorites', (req, res) => {
    const movie = req.body;

    if (!movie || movie.id == null) {
        return res.status(400).json({ error: 'Movie ID is required' });
    }

    if (!favorites.some(m => m.id === movie.id)) {
        favorites.push(movie);
    }

    res.status(201).json(favorites);
});

// Ta bort en gillad film
app.delete('/favorites/:id', (req, res) => {
    const id = Number(req.params.id);
    favorites = favorites.filter(movie => movie.id !== id);

    res.json(favorites);
});

// Hämta ogillade filmer
app.get('/dislikes', (req, res) => {
    res.json(dislikes);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
