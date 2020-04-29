import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'

const AccountDialog = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const closeDialog = () => {
        const accountDialog = document.querySelector('.account-dialog');
        accountDialog.close();
    }

    return (
        <dialog className="account-dialog mdl-dialog">
            <div className="dialog-header">
                <h3 className="mdl-dialog__title">Account</h3>
                <div className="close-icon material-icons" onClick={closeDialog}>close</div>
            </div>

            <div className="mdl-dialog__content">
                <strong>Email:</strong> {userCred.email}
            </div>
        </dialog>
    )
}

export default AccountDialog