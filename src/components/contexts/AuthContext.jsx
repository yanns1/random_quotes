import React, { useState } from 'react'
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
    });

    // Initialize user doc in db if not already done
    if (userCred) {
        const userDocRef = db.collection("users").doc(userCred.uid);

        userDocRef.get().then(userDoc => {
            if (!userDoc.exists) {
                userDocRef.set({
                    quotes: [],
                    colors: []
                })
            }
        }).catch(err => {
            console.error("Error getting userDoc:", err)
        })
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