import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('site_users') || '[]')
        const foundUser = storedUsers.find(u => u.email === email && u.password === password)

        if (foundUser) {
            // Don't store password in session
            const { password, ...safeUser } = foundUser
            setUser(safeUser)
            localStorage.setItem('user', JSON.stringify(safeUser))
            return true
        }
        return false
    }

    const register = (email, password, name) => {
        const storedUsers = JSON.parse(localStorage.getItem('site_users') || '[]')

        // Check if user exists
        if (storedUsers.some(u => u.email === email)) {
            return false
        }

        const newUser = { email, password, name }
        storedUsers.push(newUser)
        localStorage.setItem('site_users', JSON.stringify(storedUsers))

        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const value = {
        user,
        login,
        register,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
