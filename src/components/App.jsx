import React from 'react'
import Header from './header/Header.jsx'
import QuoteCard from './main/QuoteCard.jsx'
import Footer from './footer/Footer.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

const App = () => {
    return (
        <AuthContextProvider>
            <header className="header">
                <Header></Header>
            </header>
            <main className="main">
                <QuoteCard></QuoteCard>
            </main>
            <footer className="footer">
                <Footer></Footer>
            </footer>
        </AuthContextProvider>
    )
}

export default App