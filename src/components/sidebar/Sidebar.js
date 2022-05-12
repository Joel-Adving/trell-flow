import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import AddIcon from '../../assets/add_icon.svg'
import Avatar from '../avatar/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function Sidebar() {
    const { user } = useAuthContext()
    const { logout, isPending } = useLogout()
    const { windowDimensions } = useWindowDimensions()
    const { width } = windowDimensions

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                {user && (
                    <div className="user">
                        {user.photoURL && <Avatar src={user.photoURL} />}
                        <p>Hey {user.displayName}</p>
                    </div>
                )}
                <nav>
                    <ul className="links">
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New project</span>
                            </NavLink>
                        </li>
                        {!user && width < 1180 && (
                            <div className="right-links">
                                {width < 545 && <li>Trell Flow</li>}
                                <div style={{ display: 'flex' }}>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Signup</Link>
                                    </li>
                                </div>
                            </div>
                        )}
                        {user && width < 1180 && (
                            <div className="right-links">
                                <li>Trell Flow</li>
                                <li style={{ display: 'flex' }}>
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
                            </div>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
