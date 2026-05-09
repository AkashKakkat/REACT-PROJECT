import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../Context/AuthContext'
import "../CSS/navBar.css"

function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        setIsMenuOpen(false)
        logout()
        navigate('/')
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    if (!user) return null;


    return (
        <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="navbar-brand">
                <Link to="/home" onClick={closeMenu}>Movie App</Link>
            </div>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                <span className="hamburger"></span>
            </button>

            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/home" className="nav-link" onClick={closeMenu}>Home</Link>
                <Link to="/Favourites" className="nav-link" onClick={closeMenu}>Favourites</Link>
                <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', fontSize: 'inherit', padding: 0 }}>Logout</button>
            </div>
        </nav>
    )
}

export default NavBar