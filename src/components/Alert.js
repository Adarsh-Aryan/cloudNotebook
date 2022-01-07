import { React, useContext, useEffect } from 'react'
import noteContext from '../context/NoteContext'

function Alert() {

    const { alert, UpdateAlert } = useContext(noteContext)


    useEffect(() => {
        setTimeout(() => {
            UpdateAlert(null)
        }, 2000);
    }) 



    return (
        <div className="container">
            {alert && <div className={`alert alert-${alert.type} fixed-top`} role="alert">
                {alert.message}
            </div>}
        </div>
    )
}

export default Alert
