import React, { useState, createContext } from 'react'
import { auth, db } from '../../scripts/init_firebase.ts'
import { UserDoc } from '../../interfaces/i_db.ts'
import placeholderData from '../../scripts/placeholder_data.ts'
import { UserCred } from '../../interfaces/i_auth.ts'

interface Props {
    children: JSX.Element[],
}

const AuthContext = createContext(null)

const AuthContextProvider: React.Context<Props> = ({ children }): JSX.Element | null => {
    const [userCred, setUserCred] = useState<UserCred | null>(null);

    // Listen to auth changes
    auth.onAuthStateChanged((userCred: UserCred): void => {
        setUserCred(() => userCred)
    })

    /**
     * Initialize user doc in db (with placeholder data) if not already done
     * @function initializeUserDoc
     * @returns {void}
     */
    const initializeUserDoc = (placeholderData: UserDoc, userCred: UserCred): void => {
        const userDocRef = db.collection("users").doc(userCred.uid);
        userDocRef.get().then((userDoc: any) => {
            if (!userDoc.exists) {
                userDocRef.set({
                    quotes: placeholderData.quotes,
                    colors: placeholderData.colors
                })
            }
        }).catch((err: any) => {
            console.error(`Error initializing user doc: ${err}`)

        })
    }

    // useEffect here ?
    if (userCred) {
        initializeUserDoc(placeholderData, userCred)
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