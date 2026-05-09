import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import '../CSS/login.css'

function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const { login, register, user } = useAuth()
    const navigate = useNavigate()

    // If already logged in, redirect to home
    if (user) {
        return <Navigate to="/home" replace />
    }

    const validate = () => {
        const newErrors = {}

        if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required'

        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email format is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        return newErrors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
        setMessage('') // Clear message on input change
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('') // Clear any previous messages
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsSubmitting(true)

        // Simulate network delay
        setTimeout(() => {
            if (isLogin) {
                const success = login(formData.email, formData.password)
                if (success) {
                    navigate('/home')
                } else {
                    setErrors({ general: 'Invalid email or password' }) // Example error handling
                }
            } else {
                const success = register(formData.email, formData.password, formData.name)
                if (success) {
                    setIsLogin(true)
                    setMessage('Account created successfully! Please log in.')
                    setFormData(prev => ({ ...prev, password: '' })) // Clear password but keep email
                } else {
                    setErrors({ general: 'Registration failed. Email might already be in use.' }) // Example error handling
                }
            }

            setIsSubmitting(false)
        }, 1000)
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setErrors({})
        setMessage('')
        setFormData({ name: '', email: '', password: '' })
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                {message && <div className="success-message">{message}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                            />
                            {errors.name && <div className="error-text">{errors.name}</div>}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <div className="error-text">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Type your password"
                        />
                        {errors.password && <div className="error-text">{errors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#ccc' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={toggleMode}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#646cff',
                            cursor: 'pointer',
                            fontSize: 'inherit',
                            textDecoration: 'underline'
                        }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth
