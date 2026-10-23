import './Styles/App.css'
import Favorite from './pages/Fav'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import { Routes,Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'


function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<Favorite />} />
        </Routes>
      </main>
    </MovieProvider>
  );
  
}

export default App
