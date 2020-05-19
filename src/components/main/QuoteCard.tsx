import React, { useState, useEffect, useContext } from 'react'

import { pickRandomInArr, isErrorMess } from '../../scripts/utils.ts'
import { db, firebase } from '../../scripts/init_firebase.ts'

import { AuthContext } from '../contexts/AuthContext.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import placeholderData from '../../scripts/placeholder_data.ts'

import { UserDoc, QuoteObj } from '../../interfaces/i_db.ts'
import { UserCred } from '../../interfaces/i_auth.ts'

interface Props {
}

const QuoteCard: React.FC<Props> = (): JSX.Element | null => {
    const { userCred } = useContext<UserCred>(AuthContext)
    const [text, setText] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [quoteDeletedMess, setQuoteDeletedMess] = useState<string>('')


    const getDataFromDb = (): void => {
        const userDocRef = db.collection("users").doc(userCred.uid)
        userDocRef.get().then((userDoc: any) => {
            if (userDoc.exists) {
                const randomQuote = pickRandomInArr<QuoteObj>(userDoc.data().quotes)
                const randomColor = pickRandomInArr<string>(userDoc.data().colors)
                setText(() => randomQuote.quote)
                setAuthor(() => randomQuote.author)
                setColor(() => randomColor)
            }
        }).catch((err: any) => {
            console.error(`Error getting userDoc when trying to get a new quote: ${err}`)
        })
    }

    const getPlaceholderData = (placeholderData: UserDoc): void => {
        const randomQuote = pickRandomInArr(placeholderData.quotes)
        const randomColor = pickRandomInArr(placeholderData.colors)
        setText(() => randomQuote.quote)
        setAuthor(() => randomQuote.author)
        setColor(() => randomColor)
    }

    /**
     * Choose from where to get data depending on userCred + reset message from quote deletion
     * @func getData
     */
    const getData = (): void => {
        if (userCred) {
            getDataFromDb()
        } else {
            getPlaceholderData(placeholderData)
        }
        setQuoteDeletedMess(() => '')
    }

    const changeColor = (): void => {
        const root = document.documentElement
        root.style.setProperty('--primary-color', color)
    }

    const deleteQuote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        const quoteToRemove = {
            quote: e.target!.dataset.text,
            author: e.target!.dataset.author
        }
        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction((transaction: any) => {
            return transaction.get(userDocRef)
                .then((userDoc: any) => {
                    if (userDoc.exists) {
                        if (userDoc.data().quotes.length > 1) {
                            transaction.update(userDocRef, {
                                "quotes": firebase.firestore.FieldValue.arrayRemove(quoteToRemove)
                            })
                        } else {
                            return Promise.reject("You can't delete your last quote !")
                        }
                    }
                })
        })
            .then(() => {
                setQuoteDeletedMess(() => 'Quote successfully deleted !')
            })
            .catch((err: any) => {
                setQuoteDeletedMess(() => `Error: ${err}`)
                console.error(`Error during transaction for deleting quote: ${err}`)
            })
    }

    useEffect(() => {
        getData()
    }, [userCred])

    useEffect(() => {
        changeColor()
    }, [color])


    return (
        <div className="quote-card">
            <div className="quote-text">
                <FontAwesomeIcon icon={["fas", "quote-left"]} className={"quote-icon"}></FontAwesomeIcon>
                {text}
            </div>
            <div className="quote-author">- {author}</div>
            <div className="quote-footer">
                <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + text + '"  ' + '-' + author)} target="_blank" className="quote-tweet" title="Tweet this quote!">
                    <FontAwesomeIcon icon={["fab", "twitter"]} className={"twitter-icon"}></FontAwesomeIcon>
                </a>
                {userCred
                    ?
                    <div className="quote-delete">
                        <div className="delete-icon material-icons" title="Delete quote" data-text={text} data-author={author} onClick={deleteQuote}>delete</div>
                        {quoteDeletedMess
                            ?
                            <div className={isErrorMess(quoteDeletedMess) ? 'err-mess' : 'success-mess'}>{quoteDeletedMess}</div>
                            : null
                        }
                    </div>
                    : null
                }
                <button className="quote-new" onClick={getData}>New Quote</button>
            </div>
        </div>
    )
}

export default QuoteCard