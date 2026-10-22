import './Styles/App.css'
import Favorite from './pages/Fav'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import { Routes,Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <Navbar />
    <main className='main-content'>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/fav' element={<Favorite/>}/>
      </Routes>
    </main>
    </div>
  )
  
}

export default App
