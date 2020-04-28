import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * @file Creates the footer
 * @requires react
 */
const Footer = () => {
    return (
        <div>
            {/* Laisser tt aligné pour garder les espaces */}
                Made with ❤️ by <a className="footer-link" target="_blank" href="https://github.com/yanns1" title="My Github account">yanns1</a> - View source code on <a className="footer-link" target="_blank" href="https://github.com/yanns1/random_quotes" title="Github repo for the project">Github</a>
        </div>
    )
}

export default Footer;