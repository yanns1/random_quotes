import React from 'react'

const DeleteColors = ({
    colorDeletedMess,
    setColorDeletedMess
}) => {
    const colorCheckboxes = []
    return (
        <>
            <h4>Delete colors</h4>
            <form className="settings-form" action="">
                {colorCheckboxes}
                <button>Delete</button>
            </form>
        </>
    )
}

export default DeleteColors