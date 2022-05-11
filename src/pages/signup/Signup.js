import { useState } from 'react'
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState('')
    const { signup, isPending, error } = useSignup()

    const handleFileChange = e => {
        setThumbnail(null)
        const selected = e.target.files[0]
        console.log(selected)

        if (!selected) return setThumbnailError('Please select a file')
        if (!selected.type.includes('image')) return setThumbnailError('Selected file must be an image')
        if (selected.size > 100000) return setThumbnailError('Max file size is 100kb')

        setThumbnailError(null)
        setThumbnail(selected)
    }

    const handleSubmit = e => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>email:</span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <span>password:</span>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                <span>display name:</span>
                <input type="text" required value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </label>
            <label>
                <span>profile thumbnail:</span>
                <input type="file" onChange={handleFileChange} />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && (
                <button className="btn" disabled>
                    Loading
                </button>
            )}
            {error && <div className="error">{error}</div>}
        </form>
    )
}
