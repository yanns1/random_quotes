import React, { useContext } from 'react'
import { auth } from '../../scripts/init_firebase.js'
import { AuthContext } from '../contexts/AuthContext.jsx'
import dialogPolyfill from 'dialog-polyfill'
import AuthDialog from './dialogs/AuthDialog.jsx'
import SettingsDialog from './dialogs/SettingsDialog/SettingsDialog.jsx'
import AccountDialog from './dialogs/AccountDialog.jsx'

const Navbar = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const showAuthDialog = () => {
        const authDialog = document.querySelector('.auth-dialog');
        if (!authDialog.showModal) {
            dialogPolyfill.registerDialog(authDialog);
        }
        authDialog.showModal();
    }

    const showSettingsDialog = () => {
        const settingsDialog = document.querySelector('.settings-dialog');
        if (!settingsDialog.showModal) {
            dialogPolyfill.registerDialog(settingsDialog);
        }
        settingsDialog.showModal();
    }

    const signOut = () => auth.signOut()

    return (
        <nav className="navbar">
            {userCred
                ?
                <>
                    <SettingsDialog></SettingsDialog>
                    <AccountDialog></AccountDialog>
                    <li className="nav-link" onClick={signOut}>Logout</li>
                    <div className="nav-link material-icons">account_circle</div>
                    <div onClick={showSettingsDialog} className=" nav-link material-icons">settings</div>
                </>
                :
                <>
                    <AuthDialog></AuthDialog>
                    <li className="nav-link" onClick={showAuthDialog}>Sign in</li>
                </>
            }
        </nav>
    )
}

export default Navbar