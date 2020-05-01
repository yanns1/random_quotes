import React, { useState } from 'react'
import { auth, db } from '../../scripts/init_firebase'
import placeholderData from '../../scripts/placeholder_data.js'
const AuthContext = React.createContext()

/**
 * @file Initiates the authentification context and user doc in db
 * @requires react
 */
const AuthContextProvider = ({ children }) => {
    const [userCred, setUserCred] = useState(null);

    // Listen to auth changes
    auth.onAuthStateChanged(userCred => {
        setUserCred(() => userCred)
    })

    /**
     * Initialize user doc in db (with placeholder data) if not already done
     * @function initializeUserDoc
     * @returns {void}
     */
    const initializeUserDoc = placeholderData => {
        const userDocRef = db.collection("users").doc(userCred.uid);
        userDocRef.get().then(userDoc => {
            if (!userDoc.exists) {
                userDocRef.set({
                    quotes: placeholderData.quotes,
                    colors: placeholderData.colors
                })
            }
        }).catch(err => {
            console.error(`Error initializing user doc: ${err}`)

        })
    }

    if (userCred) {
        initializeUserDoc(placeholderData)
    }

    return (
        <AuthContext.Provider
            value={{
                userCred
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }