
import { Route, Routes } from 'react-router-dom'
import './CSS/app.css'
import Home from './Pages/Home'
import Favourites from './Pages/Favourites'
import NavBar from './Components/NavBar'
import Auth from './Pages/Auth'
import ProtectedRoute from './Components/ProtectedRoute'
import { MovieProvider } from './Context/MovieContext'
import { AuthProvider } from './Context/AuthContext'

function App() {


  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Auth />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/favourites' element={<Favourites />} />
            </Route>
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>




  )
}

export default App
