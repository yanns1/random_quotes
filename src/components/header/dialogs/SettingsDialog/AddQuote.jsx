import React, { useContext } from 'react'
import { firebase, db } from '../../../../scripts/init_firebase.js'
import { AuthContext } from '../../../contexts/AuthContext.jsx'

const AddQuote = ({
    quoteAddedMess,
    setQuoteAddedMess,
    isErrorMess
}) => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const pushQuoteToDb = async (e) => {
        e.preventDefault()
        const form = e.target
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
                if (userDoc.exists) {
                    transaction.update(userDocRef, {
                        "quotes": firebase.firestore.FieldValue.arrayUnion(objToPush)
                    })
                }

            })
        }).then(() => {
            setQuoteAddedMess(() => 'Quote successfully added !')
        })
        .catch(err => {
            setQuoteAddedMess(() => 'Error: Quote has not been added !')
            console.error(`Error during transaction for adding quote (either getting doc or updating it): ${err}`)
        })
        form.reset()
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
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Add quote</button>
                {quoteAddedMess
                    ?
                    <div className={isErrorMess(quoteAddedMess) ? 'err-mess' : 'success-mess'}>{quoteAddedMess}</div>
                    : null
                }
            </form>
        </>
    )
}

export default AddQuote