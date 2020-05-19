import React, { useState, useEffect, useContext } from 'react'

import { isCheckbox, isChecked, getNameOfInput } from '../../../../scripts/init_firebase.ts'
import { firebase, db } from '../../../../scripts/init_firebase.ts'

import { AuthContext } from '../../../contexts/AuthContext.tsx'

import { UserCred } from '../../../../interfaces/i_auth.ts'

interface Props {
    children: never[];
    colorDeletedMess: string;
    setColorDeletedMess: Dispatch<SetStateAction<string>>;
    isErrorMess: (mess: string) => boolean;
}

const DeleteColors: React.FC<Props> = ({
    colorDeletedMess,
    setColorDeletedMess,
    isErrorMess
}): JSX.Element | null => {
    const { userCred } = useContext<UserCred>(AuthContext)
    const [colors, setColors] = useState<[]>([])

    /**
     * Listen to db and set colors state accordingly
     * @function getStats
     * @returns {function} - unsuscribe function
     */
    const getStats = (): any => {
        const userDocRef = db.collection("users").doc(userCred.uid)
        const unsubscribe = userDocRef.onSnapshot((userDoc: any): void => {
            if (userDoc.data()) {
                setColors(() => userDoc.data().colors)
            }
        }, (err: any): void => {
            console.error(`Error during listening for colors: ${err}`)
        })

        return unsubscribe
    }

    /**
     * Start listening to db for colors
     */
    useEffect(() => {
        const unsubscribe = getStats()

        return (): void => {
            unsubscribe()
        }
    }, [])

    const createColorCheckbox = (color: string): JSX.Element => {
        return (
            <div className="color-checkbox" key={color}>
                <input type="checkbox" name={color} id={color} />
                <div className="color-box" style={{ background: color }}></div>
            </div>
        )
    }

    const deleteColors = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const form = e.target
        const formElements = form instanceof HTMLFormElement ? Array.from(form.elements) : undefined
        /**
         * @todo
         */
        const colorsToRemove = formElements
            .filter(isCheckbox)
            .filter(isChecked)
            .map(getNameOfInput)

        const userDocRef = db.collection("users").doc(userCred.uid)
        db.runTransaction((transaction: any): Promise<any> => {
            return transaction.get(userDocRef)
                .then((userDoc: any): void | Promise<any> => {
                    if (userDoc.exists) {
                        if (colorsToRemove.length < userDoc.data().colors.length) {
                            colorsToRemove.forEach(color => {
                                transaction.update(userDocRef, {
                                    colors: firebase.firestore.FieldValue.arrayRemove(color)
                                })
                            })
                        } else {
                            return Promise.reject("You must have at least 1 color remaining !")
                        }
                    }
                })
        })
            .then((): void => {
                setColorDeletedMess("Colors successfully deleted !")
            })
            .catch((err: any): void => {
                setColorDeletedMess(`Error: ${err}`)
                console.error(`Error during transaction for deleting colors: ${err}`)
            })

        if (form instanceof HTMLFormElement) {
            form.reset()
        }
    }

    return (
        <>
            <h4>Delete colors</h4>
            <form className="settings-form" onSubmit={deleteColors} action="">
                <div className="color-checkboxes">
                    {colors.map(createColorCheckbox)}
                </div>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">Delete</button>
                {colorDeletedMess
                    ?
                    <div className={isErrorMess(colorDeletedMess) ? 'err-mess' : 'success-mess'}>{colorDeletedMess}</div>
                    : null
                }
            </form>
        </>
    )
}

export default DeleteColors