import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import '../CSS/login.css'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const validate = () => {
        const newErrors = {}

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email format is invalid'
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        return newErrors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const success = login(formData.email, formData.password)
            if (success) {
                navigate('/')
            }
            setIsSubmitting(false)
        }, 1000)
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>

                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                        />
                        {errors.password && <div className="error-text">{errors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#ccc' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#646cff' }}>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
