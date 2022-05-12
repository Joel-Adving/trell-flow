import React from 'react'
import './OnlineUsers.css'
import { useCollection } from '../../hooks/useCollection'
import Avatar from '../avatar/Avatar'

export default function OnlineUsers() {
    const { documents, error } = useCollection('users')
    return (
        <div className="user-list">
            <h2>All users</h2>
            {error && <div className="error">{error}</div>}
            {documents &&
                documents.map(user => (
                    <div key={user.id} className="user-list-item">
                        <div
                            className="online-user"
                            style={user.online ? { background: 'green' } : { background: 'gray' }}
                        />
                        <span>{user.displayName}</span>
                        {user.photoURL && <Avatar src={user.photoURL} />}
                    </div>
                ))}
        </div>
    )
}
