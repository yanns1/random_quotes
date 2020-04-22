import React, { useState, useEffect, useContext } from 'react'
import AddQuote from './AddQuote.jsx'
import AddColor from './AddColor.jsx'
import DeleteColors from './DeleteColors.jsx'

const SettingsDialog = () => {
    // States
    const [quoteAddedMess, setQuoteAddedMess] = useState('')
    const [colorAddedMess, setColorAddedMess] = useState('')
    const [colorDeletedMess, setColorDeletedMess] = useState('')

    const isErrorMess = mess => /^Error/.test(mess)

    const closeDialog = () => {
        const authDialog = document.querySelector('.settings-dialog');
        authDialog.close();

        //  Reset forms
        const settingsForms = Array.from(document.querySelectorAll('.settings-form'))
        settingsForms.forEach(form => {
            form.reset()
        })

        // Reset messages
        setQuoteAddedMess(() => '')
        setColorAddedMess(() => '')
        setColorDeletedMess(() => '')
    }


    useEffect(() => {
        componentHandler.upgradeDom()
    }, [])

    return (
        <dialog className="settings-dialog mdl-dialog">
            <h3 className="mdl-dialog__title">Settings</h3>
            <div className="close-icon material-icons" onClick={closeDialog}>close</div>
            <div className="mdl-dialog__content">
                <AddQuote
                    quoteAddedMess={quoteAddedMess}
                    setQuoteAddedMess={setQuoteAddedMess}
                    isErrorMess={isErrorMess}
                >
                </AddQuote>
                <AddColor
                    colorAddedMess={colorAddedMess}
                    setColorAddedMess={setColorAddedMess}
                    isErrorMess={isErrorMess}
                >
                </AddColor>
                <DeleteColors
                    colorDeletedMess={colorDeletedMess}
                    setColorDeletedMess={setColorDeletedMess}                    isErrorMess={isErrorMess}
                >
                </DeleteColors>
            </div>
        </dialog>
    )
}

export default SettingsDialog