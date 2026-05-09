import { useEffect, useState } from 'react'

const Toast = ({ message, onClose }) => {
    const [animationClass, setAnimationClass] = useState('toast-enter')

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationClass('toast-exit')
            setTimeout(() => {
                onClose()
            }, 300) // Wait for exit animation
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`toast-notification ${animationClass}`}>
            {message}
        </div>
    )
}

export default Toast
