import React, { useState, useEffect, useContext } from 'react'
import { firebase, db } from '../../../../scripts/init_firebase.js'
import { AuthContext } from '../../../contexts/AuthContext.jsx'

const DeleteColors = ({
    colorDeletedMess,
    setColorDeletedMess,
    isErrorMess
}) => {
    // Contexts
    const { userCred } = useContext(AuthContext)
    // States
    const [colors, setColors] = useState([])

    /**
     * Listen to db and set colors state accordingly
     * @function getStats
     * @returns {function} - unsuscribe function
     */
    const getStats = () => {
        const userDocRef = db.collection("users").doc(userCred.uid)
        const unsubscribe = userDocRef.onSnapshot(userDoc => {
            if (userDoc.data()) {
                setColors(() => userDoc.data().colors)
            }
        }, err => {
            console.error(`Error during listening for colors: ${err}`)
        })

        return unsubscribe
    }

    /**
     * Start listening to db for colors
     */
    useEffect(() => {
        const unsubscribe = getStats()

        return () => {
            unsubscribe()
        }
    }, [])

    // createColorCheckbox :: String -> JSX
    const createColorCheckbox = color => {
        return (
            <div className="color-checkbox" key={color}>
                <input type="checkbox" name={color} id={color}/>
                <div className="color-box" style={{ background: color}}></div>
            </div>
        )
    }

    const deleteColors = e => {
        e.preventDefault()

        const form = e.target
        const isCheckbox = el => el.type === "checkbox"
        const isChecked = el => el.checked === true
        const getName = el => el.name
        const colorsToRemove = Array.from(form.elements)
                                .filter(isCheckbox)
                                .filter(isChecked)
                                .map(getName)

        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction(transaction => {
            return transaction.get(userDocRef)
                .then(userDoc => {
                    if (userDoc.exists) {
                        if (colorsToRemove.length < userDoc.data().colors.length) {
                            colorsToRemove.forEach(color => {
                                transaction.update(userDocRef, {
                                    colors: firebase.firestore.FieldValue.arrayRemove(color)
                                })
                            })
                        } else {
                            return Promise.reject("You must have at least 1 color remaining !")
                        }
                    }
                })
        })
        .then(() => {
            setColorDeletedMess(() => "Colors successfully deleted !")
        })
        .catch(err => {
            setColorDeletedMess(() => `Error: ${err}`)
            console.error(`Error during transaction for deleting colors: ${err}`)
        })

        form.reset()
    }

    return (
        <>
            <h4>Delete colors</h4>
            <form className="settings-form" onSubmit={deleteColors} action="">
                <div className="color-checkboxes">
                    {colors.map(createColorCheckbox)}
                </div>
                <button>Delete</button>
                {colorDeletedMess
                    ?
                    <div className={isErrorMess(colorDeletedMess) ? 'err-mess' : 'success-mess'}>{colorDeletedMess}</div>
                    : null
                }
            </form>
        </>
    )
}

export default DeleteColors