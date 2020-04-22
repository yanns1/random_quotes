import React, { useState, useEffect, useContext } from 'react'
import { getEl } from '../../../../scripts/utils.js'
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
            setColors(() => userDoc.data().colors)
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

    console.log(colors)
    /**
     * @todo
     * map over colors and return JSX for a checkbox combined with a div with background set to color
     */
    const colorCheckboxes = []
    return (
        <>
            <h4>Delete colors</h4>
            <form className="settings-form" action="">
                {colorCheckboxes}
                <button>Delete</button>
            </form>
        </>
    )
}

export default DeleteColors