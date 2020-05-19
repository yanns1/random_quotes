import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.tsx'

import { getEl } from '../../../scripts/utils.ts'

import { UserCred } from '../../../interfaces/i_auth.ts'


interface Props {
}

const AccountDialog: React.FC<Props> = (): JSX.Element | null => {
    const { userCred } = useContext<UserCred>(AuthContext)

    const closeDialog = (): void => {
        const accountDialog = getEl('.account-dialog');
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