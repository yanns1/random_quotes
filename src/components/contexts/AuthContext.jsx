import React, { useState } from 'react'
import { getJSON } from '../../scripts/utils.js'
import { auth, db } from '../../scripts/init_firebase'
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
    const initializeUserDoc = async () => {
        try {
            const userDocRef = db.collection("users").doc(userCred.uid);
            // absolute path is needed
            const url = "/src/data/placeholder_data.json"
            const placeholderData = await getJSON(url)
            const userDoc = await userDocRef.get()
            if (!userDoc.exists) {
                userDocRef.set({
                    quotes: placeholderData.quotes,
                    colors: placeholderData.colors
                })
            }
        } catch (err) {
            console.error(`Error fetching placeholder data, then initializing user doc: ${err}`)
        }
    }

    if (userCred) {
        initializeUserDoc()
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