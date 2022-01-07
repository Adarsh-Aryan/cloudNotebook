import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'

function NoteItem(props) {

    const {deleteNote,UpdateAlert}=useContext(noteContext)
    const {note,updateNote}=props
    const delNote=()=>{
        
        deleteNote(note._id)
        UpdateAlert("success","Success! Note Deleted Successfully")
        

    }
    
    return (
        <div className="card col-md-4 mx-3 my-3" style={{width: "20rem"}}>

            <div className="card-body">
                
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fas fa-trash-alt" onClick={delNote}></i>
                <i className="fas fa-edit" onClick={()=>{updateNote(note)}}></i>

            </div>
        </div>
    )
}

export default NoteItem
