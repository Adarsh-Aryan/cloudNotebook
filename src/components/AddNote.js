import {React,useState,useContext } from 'react'
import noteContext from '../context/NoteContext'

function AddNote() {
    
    const {addNote,UpdateAlert}=useContext(noteContext)

    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleChange= (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const handleClick= (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        UpdateAlert("success","Success! Note Add Suceesfully")
        setnote({title:"",description:"",tag:""})
        

    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange}/>
                    
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" rows="6" className="form-control" id="description" value={note.description} name="description" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
                    
            </div>
            <button type="submit" className="btn btn-sm btn-outline-info" onClick={handleClick}>ADD <i className="fas fa-sticky-note"></i></button>
            
        </form>
    )
}

export default AddNote

