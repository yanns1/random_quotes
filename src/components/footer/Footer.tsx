import React from 'react'

interface Props {

}

const Footer: React.FC<Props> = (): JSX.Element | null => {
    return (
        <div>
            {/* Laisser tt aligné pour garder les espaces */}
                Made with ❤️ by <a className="footer-link" target="_blank" href="https://github.com/yanns1" title="My Github account">yanns1</a> - View source code on <a className="footer-link" target="_blank" href="https://github.com/yanns1/random_quotes" title="Github repo for the project">Github</a>
        </div>
    )
}

export default Footer;