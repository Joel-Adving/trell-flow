import './Login.css'
import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSubmit = async e => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <span>password:</span>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <div className="flex">
                {!isPending && <button className="btn">Login</button>}
                {!isPending && (
                    <Link to="/signup" className="ml-auto">
                        Signup
                    </Link>
                )}
            </div>
            {isPending && (
                <button className="btn" disabled>
                    Loading...
                </button>
            )}
            {error && <div className="error">{error}</div>}
        </form>
    )
}
