import React from 'react'
import FirebaseUI from '../FirebaseUI.jsx'

const AuthDialog = () => {
    const closeDialog = () => {
        const authDialog = document.querySelector('.auth-dialog');
        authDialog.close();
    }

    return (
        <dialog className="auth-dialog mdl-dialog">
            <div className="dialog-header">
                <h3 className="mdl-dialog__title">Sign In</h3>
                <div className="close-icon material-icons" onClick={closeDialog}>close</div>
            </div>
            <div className="mdl-dialog__content">
                <FirebaseUI></FirebaseUI>
            </div>
        </dialog>
    )
}

export default AuthDialog