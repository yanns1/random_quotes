import React, { useContext } from 'react'

import { getEl } from '../../../../scripts/utils.ts'
import { firebase, db } from '../../../../scripts/init_firebase.ts'

import { AuthContext } from '../../../contexts/AuthContext.tsx'

import { QuoteObj } from '../../../../interfaces/i_db.ts'
import { UserCred } from '../../../../interfaces/i_auth.ts'


interface Props {
    children: never[];
    quoteAddedMess: string;
    setQuoteAddedMess: Dispatch<SetStateAction<string>>;
    isErrorMess: (mess: string) => boolean;
}

const AddQuote: React.FC<Props> = ({
    quoteAddedMess,
    setQuoteAddedMess,
    isErrorMess
}): JSX.Element | null => {
    const { userCred } = useContext<UserCred>(AuthContext)

    const pushQuoteToDb = async (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const form = e.target
        const quote = getEl('#quote').value
        const author = getEl('#author').value
        const objToPush: QuoteObj = {
            quote,
            author
        }

        // Make transaction to be sure that quote doesn't already exists
        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction((transaction: any): Promise<any> => {
            return transaction.get(userDocRef).then((userDoc: any): void => {
                if (userDoc.exists) {
                    transaction.update(userDocRef, {
                        "quotes": firebase.firestore.FieldValue.arrayUnion(objToPush)
                    })
                }

            })
        }).then((): void => {
            setQuoteAddedMess('Quote successfully added !')
        })
            .catch((err: any): void => {
                setQuoteAddedMess('Error: Quote has not been added !')
                console.error(`Error during transaction for adding quote (either getting doc or updating it): ${err}`)
            })

        if (form instanceof HTMLFormElement) {
            form.reset()
        }
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