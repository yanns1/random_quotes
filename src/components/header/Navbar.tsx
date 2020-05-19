import React, { useContext } from 'react'
import { getEl } from '../../scripts/utils.ts'
import { auth } from '../../scripts/init_firebase.ts'
import { AuthContext } from '../contexts/AuthContext.tsx'
import dialogPolyfill from 'dialog-polyfill'
import AuthDialog from './dialogs/AuthDialog.tsx'
import SettingsDialog from './dialogs/SettingsDialog/SettingsDialog.tsx'
import AccountDialog from './dialogs/AccountDialog.tsx'

import { UserCred } from '../../interfaces/i_auth.ts'

interface Props {
}

const Navbar: React.FC<Props> = (): JSX.Element | null => {
    const { userCred } = useContext<UserCred>(AuthContext)

    const showAuthDialog = (): void => {
        const authDialog = getEl('.auth-dialog');
        if (!authDialog.showModal) {
            dialogPolyfill.registerDialog(authDialog);
        }
        authDialog.showModal();
    }

    const showSettingsDialog = (): void => {
        const settingsDialog = getEl('.settings-dialog');
        if (!settingsDialog.showModal) {
            dialogPolyfill.registerDialog(settingsDialog);
        }
        settingsDialog.showModal();
    }

    const showAccountDialog = (): void => {
        const accountDialog = getEl('.account-dialog');
        if (!accountDialog.showModal) {
            dialogPolyfill.registerDialog(accountDialog);
        }
        accountDialog.showModal();
    }

    const signOut = (): void => auth.signOut()

    return (
        <nav className="navbar">
            {userCred
                ?
                <>
                    <SettingsDialog></SettingsDialog>
                    <AccountDialog></AccountDialog>
                    <li className="nav-link" onClick={signOut}>Logout</li>
                    <div className="nav-link material-icons" onClick={showAccountDialog} title="Account infos">account_circle</div>
                    <div onClick={showSettingsDialog} className=" nav-link material-icons" title="Settings">settings</div>
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