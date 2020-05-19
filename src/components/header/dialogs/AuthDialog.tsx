import React from 'react'
import FirebaseUI from '../FirebaseUI.tsx'

import { getEl } from '../../../scripts/utils.ts'


interface Props {
}

const AuthDialog: React.FC<Props> = (): JSX.Element | null => {
    const closeDialog = (): void => {
        const authDialog = getEl('.auth-dialog');
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