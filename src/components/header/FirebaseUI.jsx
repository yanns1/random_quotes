import React from 'react'
import { firebase, auth } from '../../scripts/init_firebase.js'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const FirebaseUI = () => {
    const uiConfig = {
        signInSuccessUrl: "http://localhost:8080/",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        signInFlow: "popup",
    }

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    )
}

export default FirebaseUI