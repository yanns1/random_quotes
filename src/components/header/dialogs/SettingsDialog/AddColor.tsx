import React, { useContext } from 'react'

import { getEl } from '../../../../scripts/utils.ts'
import { firebase, db } from '../../../../scripts/init_firebase.ts'

import { AuthContext } from '../../../contexts/AuthContext.tsx'

import { UserCred } from '../../../../interfaces/i_auth.ts'


interface Props {
    children: never[];
    colorAddedMess: string;
    setColorAddedMess: Dispatch<SetStateAction<string>>;
    isErrorMess: (mess: string) => boolean;
}

const AddColor: React.FC<Props> = ({
    colorAddedMess,
    setColorAddedMess,
    isErrorMess
}): JSX.Element | null => {
    const { userCred } = useContext<UserCred>(AuthContext)

    const pushColorToDb = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const form = e.target

        const color = getEl('#color-picker').value

        // Make transaction to be sure that quote doesn't already exists
        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction((transaction: any): Promise<any> => {
            return transaction.get(userDocRef).then((userDoc: any) => {
                if (userDoc.exists) {
                    if (userDoc.data().colors.length >= 10) {
                        return Promise.reject("You can't have more than 10 colors ! Delete one before choosing another.")
                    }
                    transaction.update(userDocRef, {
                        "colors": firebase.firestore.FieldValue.arrayUnion(color)
                    })
                }

            })
        }).then((): void => {
            setColorAddedMess('Color successfully added !')
        })
            .catch((err: any): void => {
                setColorAddedMess(`Error: ${err}`)
                console.error(`Error during transaction for adding color (either getting doc or updating it): ${err}`)
            })

        if (form instanceof HTMLFormElement) {
            form.reset()
        }
    }

    return (
        <>
            <h4>Add a color</h4>
            <div className="hint"><strong>Hint:</strong> Avoid bright colors such as yellow or white, because it will be really difficult to read after !</div>
            <form className="settings-form" onSubmit={pushColorToDb} action="">
                <div className="color-picker">
                    <label htmlFor="color-picker">Choose a color: </label>
                    <input type="color" id="color-picker" name="color-picker" />
                </div>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" type="submit">Add color</button>
                {colorAddedMess
                    ?
                    <div className={isErrorMess(colorAddedMess) ? 'err-mess' : 'success-mess'}>{colorAddedMess}</div>
                    : null
                }
            </form>
        </>
    )
}


export default AddColor