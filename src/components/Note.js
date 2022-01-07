import { useContext, React, useEffect, useRef,useState } from 'react'
import AddNote from './AddNote'
import noteContext from '../context/NoteContext'
import NoteItem from './NoteItem'
import {useNavigate } from 'react-router-dom'


function Note() {
    const ref = useRef()
    const refClose=useRef()
    const { notes, getNotes,editNote,UpdateAlert} = useContext(noteContext)
    const navigate= useNavigate()

    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    useEffect(() => {
        if (localStorage.getItem('token')){

            getNotes()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
        
    }
    const updateNote=(currentNote)=>{
        
        ref.current.click()
        setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
        
    }
   
    

    const handleClick=()=>{
        refClose.current.click()
        editNote(note.id,note.etitle,note.edescription,note.etag)
        UpdateAlert("success","Success! Note Edited Successfully")

    }



    return (
        <div className='container'>
            <h2 className="my-3">Add a Note</h2>
            <AddNote />
            <h2 className='my-3'>Your Notes</h2>


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={handleChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" rows="6" className="form-control" id="edescription" name="edescription" onChange={handleChange} value={note.edescription}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={handleChange} value={note.etag} />

                                </div>
                                

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">

                {notes.length===0?<h3>No Notes to Display</h3>: notes.map((note) => {

                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>

        </div>
    )
}


export default Note
