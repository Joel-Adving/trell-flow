import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Temple from '../../assets/temple.svg'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Navbar() {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()
    console.log(user)
    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                        <div className="logo-wrapper">
                            {/* <img src={Temple} alt="dojo logo" /> */}
                            <span>Trell Flow</span>
                        </div>
                    </Link>
                </li>

                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}
                {user && (
                    <li>
                        {!isPending && (
                            <button className="btn" onClick={logout}>
                                Logout
                            </button>
                        )}
                        {isPending && (
                            <button className="btn" disabled>
                                Logging out...
                            </button>
                        )}
                    </li>
                )}
            </ul>
        </div>
    )
}
