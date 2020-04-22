import React, { useContext } from 'react'
import { auth, uiConfig } from '../scripts/init_firebase.js'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { AuthContext } from './contexts/AuthContext.jsx'

const Header = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    function signOut() {
        auth.signOut();
    }
    return (
        <div className="header">
            <div className="logo">RQ</div>
            <nav className="navbar">
                {userCred
                    ?
                    <>
                        <li onClick={signOut}>Logout</li>
                        <div className="material-icons">account_circle</div>
                        <div className="material-icons">settings</div>
                    </>
                    :
                    <>
                        <li onClick={signOut}>Sign in</li>

                    </>
                }
            </nav>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    )
}

export default Header