import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { useAuthContext } from './hooks/useAuthContext'
import OnlineUsers from './components/onlineUsers/OnlineUsers'
import useWindowDimensions from './hooks/useWindowDimensions'

function App() {
    const { user, authIsReady } = useAuthContext()
    const { windowDimensions } = useWindowDimensions()
    const { width } = windowDimensions

    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    <Sidebar />
                    <div className="container">
                        {width && width > 1180 && <Navbar />}
                        <Switch>
                            <Route exact path="/">
                                <Dashboard />
                            </Route>
                            <Route path="/create">
                                {!user && <Redirect to="/login" />}
                                {user && <Create />}
                            </Route>
                            <Route path="/projects/:id">
                                <Project />
                            </Route>
                            <Route path="/login">
                                {user && <Redirect to="/" />}
                                {!user && <Login />}
                            </Route>
                            <Route path="/signup">
                                {user && <Redirect to="/" />}
                                {!user && <Signup />}
                            </Route>
                        </Switch>
                    </div>

                    {width && width > 768 && <OnlineUsers />}
                </BrowserRouter>
            )}
        </div>
    )
}

export default App
