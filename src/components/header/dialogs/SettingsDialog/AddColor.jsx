import React, { useContext } from 'react'
import { getEl } from '../../../../scripts/utils.js'
import { firebase, db } from '../../../../scripts/init_firebase.js'
import { AuthContext } from '../../../contexts/AuthContext.jsx'

const AddColor = ({
    colorAddedMess,
    setColorAddedMess,
    isErrorMess
}) => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const pushColorToDb = e => {
        e.preventDefault()
        const form = e.target

        const color = getEl('#color-picker').value

        // Make transaction to be sure that quote doesn't already exists
        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction(transaction => {
            return transaction.get(userDocRef).then(userDoc => {
                if (userDoc.exists) {
                    if (userDoc.data().colors.length >= 10) {
                        return Promise.reject("You can't have more than 10 colors ! Delete one before choosing another.")
                    }
                    transaction.update(userDocRef, {
                        "colors": firebase.firestore.FieldValue.arrayUnion(color)
                    })
                }

            })
        }).then(() => {
            setColorAddedMess(() => 'Color successfully added !')
        })
        .catch(err => {
            setColorAddedMess(() => `Error: ${err}`)
            console.error(`Error during transaction for adding color (either getting doc or updating it): ${err}`)
        })
        form.reset()
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