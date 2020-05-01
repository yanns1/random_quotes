import React, { useContext } from 'react'
import Navbar from './Navbar.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'
import randomQuotesLogo from '../../img/random_quotes_logo.svg'

const Header = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    return (
        <>
            <div className="subheader">
                <a href="/">
                    <img className="logo" src={randomQuotesLogo} alt="Random Quotes Logo" /></a>
                <Navbar></Navbar>
            </div>
            {userCred
                ? null
                : <div className="not-authenticated-mess">
                    You want to choose your own quotes and colors ? Sign in !
                </div>
            }
        </>
    )
}

export default Header