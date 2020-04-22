import React, { useState, useEffect, useContext } from 'react'
import { firebase, db } from '../../../scripts/init_firebase.js'
import { AuthContext } from '../../contexts/AuthContext.jsx'

const SettingsDialog = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)
    // States
    const [quoteAddedMess, setQuoteAddedMess] = useState('')
    const [colorAddedMess, setColorAddedMess] = useState('')
    const [colorDeletedMess, setColorDeletedMess] = useState('')

    const closeDialog = () => {
        const authDialog = document.querySelector('.settings-dialog');
        authDialog.close();

        // Reset messages
        setQuoteAddedMess(() => '')
        setColorAddedMess(() => '')
        setColorDeletedMess(() => '')
    }

    const pushQuoteToDb = e => {
        e.preventDefault()
        const quote = document.querySelector('#quote').value
        const author = document.querySelector('#author').value
        const objToPush = {
            quote,
            author
        }
        // Make transaction to be sure that quote doesn't already exists
        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction(transaction => {
            return transaction.get(userDocRef).then(userDoc => {
                if (!userDoc.exists) {
                    throw "userDoc does not exist"
                }
                transaction.update(userDocRef, {
                    "quotes": firebase.firestore.FieldValue.arrayUnion(objToPush)
                })
            })
        }).then(() => {
            setQuoteAddedMess(() => 'Quote successfully added !')
        })
        .catch(err => {
            setQuoteAddedMess(() => 'Error: Quote has not been added !')
            console.error(`Error during transaction for adding quote (either getting doc or updating it): ${err}`)
        })
    }

    useEffect(() => {
        componentHandler.upgradeDom()
    }, [])

    const colorCheckboxes = []

    const isQuoteMessError = mess => /^Error/.test(mess)
    return (
        <dialog className="settings-dialog mdl-dialog">
            <h3 className="mdl-dialog__title">Settings</h3>
            <div className="close-icon material-icons" onClick={closeDialog}>close</div>
            <div className="mdl-dialog__content">
                <h4>Add a quote</h4>
                <form className="add-quote" onSubmit={pushQuoteToDb} action="">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <textarea className="mdl-textfield__input" type="text" rows="1" id="quote"></textarea>
                        <label className="mdl-textfield__label" htmlFor="quote">Quote...</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="author" />
                        <label className="mdl-textfield__label" htmlFor="author">Author...</label>
                    </div>
                    <button type="submit">Add quote</button>
                    {quoteAddedMess
                        ?
                        <div className={isQuoteMessError(quoteAddedMess) ? 'quote-message error' : 'quote-message success'}>{quoteAddedMess}</div>
                        : null
                    }
                </form>


                <h4>Add a color</h4>
                <div>
                    <label htmlFor="color-picker">Choose a color: </label>
                    <input type="color" id="color-picker" name="color-picker" />
                </div>
                <button>Add color</button>

                <h4>Delete colors</h4>
                {colorCheckboxes}
                <button>Delete</button>
            </div>
        </dialog>
    )
}

export default SettingsDialog