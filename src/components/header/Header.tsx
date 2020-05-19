import React, { useContext } from 'react'
import Navbar from './Navbar.tsx'
import { AuthContext } from '../contexts/AuthContext.tsx'
import randomQuotesLogo from '../../img/random_quotes_logo.svg'
import { UserCred } from '../../interfaces/i_auth.ts'

interface Props {

}

const Header: React.FC<Props> = (): JSX.Element | null => {
    const { userCred } = useContext<UserCred | null>(AuthContext)

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