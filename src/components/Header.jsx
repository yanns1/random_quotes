import React, { useContext } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { AuthContext } from './contexts/AuthContext.jsx'

function Header() {
    // Contexts
    const { userCred } = useContext(AuthContext)

    return (
        <div className="header">
            <div className="logo">RQ</div>
            <nav className="navbar">
                {userCred
                    ?
                    <>
                        <li>Logout</li>
                        <div class="material-icons">account_circle</div>
                        <div class="material-icons">settings</div>
                    </>
                    :
                    <>
                        <li>Sign up</li>
                        <li>Login</li>
                    </>
                }
            </nav>
        </div>
    )
}

export default Header