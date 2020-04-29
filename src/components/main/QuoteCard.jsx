import React, { useState, useEffect, useContext } from 'react'
import { pickRandomInArr } from '../../scripts/utils.js'
import { db, firebase } from '../../scripts/init_firebase.js'
import { AuthContext } from '../contexts/AuthContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import placeholderData from '../../scripts/placeholder_data.js'

const QuoteCard = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)
    // States
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [color, setColor] = useState('')
    const [quoteDeletedMess, setQuoteDeletedMess] = useState('')

    const isErrorMess = mess => /^Error/.test(mess)

    /**
     * Set random quote and random color as states, from db data
     * @function getQuoteAndColor
     * @returns {void}
     */
    const getDataFromDb = () => {
        const userDocRef = db.collection("users").doc(userCred.uid)
        userDocRef.get().then(userDoc => {
            if (userDoc.exists) {
                const randomQuote = pickRandomInArr(userDoc.data().quotes)
                const randomColor = pickRandomInArr(userDoc.data().colors)
                setText(() => randomQuote.quote)
                setAuthor(() => randomQuote.author)
                setColor(() => randomColor)
            }
        }).catch(err => {
            console.error(`Error getting userDoc when trying to get a new quote: ${err}`)
        })
    }

    const getPlaceholderData = () => {
        const randomQuote = pickRandomInArr(placeholderData.quotes)
        const randomColor = pickRandomInArr(placeholderData.colors)
        setText(() => randomQuote.quote)
        setAuthor(() => randomQuote.author)
        setColor(() => randomColor)
    }

    /**
     * Choose from where to get data depending on userCred + reset message from quote deletion
     * @function getData
     * @returns {void}
     */
    const getData = () => {
        if (userCred) {
            getDataFromDb()
        } else {
            getPlaceholderData()
        }
        setQuoteDeletedMess(() => '')
    }

    /**
     * Change page primary color depending on color state
     */
    const changeColor = () => {
        const root = document.documentElement
        root.style.setProperty('--primary-color', color)
    }

    const deleteQuote = e => {
        const quoteToRemove = {
            quote: e.target.dataset.text,
            author: e.target.dataset.author
        }
        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction(transaction => {
            return transaction.get(userDocRef)
                .then(userDoc => {
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
        .catch(err => {
            setQuoteDeletedMess(() => `Error: ${err}`)
            console.error(`Error during transaction for deleting quote: ${err}`)
        })
    }

    /**
     * Set text and author at first render, otherwise nothing appears
     */
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