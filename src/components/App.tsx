import React from 'react'
import Header from './header/Header.tsx'
import QuoteCard from './main/QuoteCard.tsx'
import Footer from './footer/Footer.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'

const App: React.FC = () => {
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

