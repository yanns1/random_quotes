import React, { useState, useEffect, useContext } from 'react'
import { db } from '../../scripts/init_firebase'
import { AuthContext } from '../contexts/AuthContext.jsx'

const QuoteCard = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)
    // console.log(userCred)
    // const [text, setText] = useState('');
    // const [author, setAuthor] = useState('');
    const [quotes, setQuotes] = useState([])

    // function chooseRandomly(array) {
    //     const randomIndex = Math.round(Math.random() * (array.length - 1));
    //     return array[randomIndex];
    // }

    const getQuote = () => {
        const userDocRef = db.collection("users").doc(userCred.uid)
        userDocRef.get().then(doc => {
            // console.log(doc)
            if (doc.exists) {
                setQuotes(() => doc.data().quotes)
            } else {
                console.error(`userDoc doesn't exist`)
            }
        })

        // return {
        //     quote: ,
        //     author:
        // }
    }

    if (userCred) {
        getQuote()
    }

    // function changeQuote() {
    //     quoteCollection.onSnapshot(snapshot => {
    //         let quotesArray = [];
    //         snapshot.docChanges().forEach(change => {
    //             const quoteObj = change.doc.data();
    //             quotesArray.push(quoteObj);
    //         });
    //         const randomQuote = chooseRandomly(quotesArray);
    //         setText(() => randomQuote.quote);
    //         setAuthor(() => randomQuote.author);
    //     })
    // }

    // function changeColor() {
    //     colorCollection.onSnapshot(snapshot => {
    //         let colorsArray = [];
    //         snapshot.docChanges().forEach(change => {
    //             const color = change.doc.data().value;
    //             colorsArray.push(color);
    //         });
    //         const randomColor = chooseRandomly(colorsArray);
    //         const root = document.documentElement;
    //         root.style.setProperty('--primary', randomColor);
    //     })
    // }

    // function handleClick(e) {
    //     const { id } = e.target;
    //     if (id === 'button-quote') {
    //         changeQuote();
    //         changeColor();
    //     }
    // }

    // useEffect(() => {
    //     // absolute path obligatoirement dans fetch(). Donc '/' pour partir du nom de domaine.
    //     changeQuote();
    //     changeColor();
    // }, []);

    return null
    // return (
    //     <div id="quote-box">
    //         <div id="text">
    //             <i className="fas fa-quote-left"></i>
    //             {text}
    //         </div>
    //         <div id="author">- {author}</div>
    //         <div id="new-quote">
    //             <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + text + '"  ' + '-' + author)} target="_blank" id="tweet-quote" title="Tweet this quote!"><i className="fab fa-twitter" /></a>
    //             <button id="button-quote" onClick={handleClick}>New Quote</button>
    //         </div>
    //     </div>
    // )
}

export default QuoteCard