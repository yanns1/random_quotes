import React, { useState, useContext } from 'react'
import { firebase, db } from '../../../../scripts/init_firebase.js'
import { AuthContext } from '../../../contexts/AuthContext.jsx'

const AddQuote = ({
    quoteAddedMess,
    setQuoteAddedMess
}) => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const isQuoteMessError = mess => /^Error/.test(mess)

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

    return (
        <>
            <h4>Add a quote</h4>
            <form className="settings-form" onSubmit={pushQuoteToDb} action="">
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
        </>
    )
}

export default AddQuote