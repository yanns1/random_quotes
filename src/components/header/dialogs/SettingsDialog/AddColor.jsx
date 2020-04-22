import React from 'react'

const AddColor = ({
    colorAddedMess,
    setColorAddedMess
}) => {
    const pushColorToDb = e => {
        console.log(e)

    }
    return (
        <>
            <h4>Add a color</h4>
            <form className="settings-form" onSubmit={pushColorToDb} action="">
                <div>
                    <label htmlFor="color-picker">Choose a color: </label>
                    <input type="color" id="color-picker" name="color-picker" />
                </div>
                <button>Add color</button>
            </form>
        </>
    )
}

export default AddColor