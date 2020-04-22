import React from 'react'
import Header from './header/Header.jsx'
import QuoteCard from './main/QuoteCard.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

const App = () => {
    return (
        <AuthContextProvider>
            <Header></Header>
            <QuoteCard></QuoteCard>
        </AuthContextProvider>
    )
}

export default App