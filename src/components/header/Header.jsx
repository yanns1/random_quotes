import React, { useContext } from 'react'
import { auth } from '../../scripts/init_firebase.js'
import { AuthContext } from '../contexts/AuthContext.jsx'
import dialogPolyfill from 'dialog-polyfill'
import AuthDialog from './AuthDialog.jsx'

const Header = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const showAuthDialog = () => {
        const authDialog = document.querySelector('.auth-dialog');
        if (!authDialog.showModal) {
            dialogPolyfill.registerDialog(authDialog);
        }
        authDialog.showModal();
    }
    const signOut = () => auth.signOut()

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
                        <AuthDialog></AuthDialog>
                        <li onClick={showAuthDialog}>Sign in</li>
                    </>
                }
            </nav>
        </div>
    )
}

export default Header