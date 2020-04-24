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
                        setColorAddedMess(() => "Error: You can't have more than 10 colors ! Delete one before choosing another.")
                        return
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
            setColorAddedMess(() => 'Error: Color has not been added !')
            console.error(`Error during transaction for adding color (either getting doc or updating it): ${err}`)
        })
        form.reset()
    }

    return (
        <>
            <h4>Add a color</h4>
            <form className="settings-form" onSubmit={pushColorToDb} action="">
                <div>
                    <label htmlFor="color-picker">Choose a color: </label>
                    <input type="color" id="color-picker" name="color-picker" />
                </div>
                <button>Add color</button>
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