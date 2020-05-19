import React, { useState, useEffect } from 'react'

import { isErrorMess, getEl, getEls } from '../../../../scripts/utils.ts'

import AddQuote from './AddQuote.tsx'
import AddColor from './AddColor.tsx'
import DeleteColors from './DeleteColors.tsx'


interface Props {

}

const SettingsDialog: React.FC<Props> = (): JSX.Element | null => {
    const [quoteAddedMess, setQuoteAddedMess] = useState<string>('')
    const [colorAddedMess, setColorAddedMess] = useState<string>('')
    const [colorDeletedMess, setColorDeletedMess] = useState<string>('')

    const closeDialog = (): void => {
        const authDialog = getEl('.settings-dialog');
        authDialog.close();

        //  Reset forms
        const settingsForms = Array.from(getEls('.settings-form'))
        settingsForms.forEach((form: unknown): void => {
            if (form instanceof HTMLFormElement) {
                form.reset()
            }
        })

        setQuoteAddedMess('')
        setColorAddedMess('')
        setColorDeletedMess('')
    }


    useEffect(() => {
        componentHandler.upgradeDom()
    }, [])

    return (
        <dialog className="settings-dialog mdl-dialog">
            <div className="dialog-header">
                <h3 className="mdl-dialog__title">Settings</h3>
                <div className="close-icon material-icons" onClick={closeDialog}>close</div>
            </div>
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
                    setColorDeletedMess={setColorDeletedMess} isErrorMess={isErrorMess}
                >
                </DeleteColors>
            </div>
        </dialog>
    )
}

export default SettingsDialog