import React from 'react'
import Header from './Header.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

const App = () => {
    return (
        <AuthContextProvider>
            <Header></Header>
        </AuthContextProvider>
    )
}

export default App