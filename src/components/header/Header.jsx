import React, { useContext } from 'react'
import Navbar from './Navbar.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'

const Header = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    return (
        <>
            <div className="subheader">
                <a className="logo" href="/">RQ</a>
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