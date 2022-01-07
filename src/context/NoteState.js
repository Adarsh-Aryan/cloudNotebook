import NoteContext from "./NoteContext"
import { useState, React } from 'react'

function NoteState(props) {


    const [notes, setnotes] = useState([])

    const getNotes = async () => {
        let url = "http://localhost:5000/api/notes/fetchAllNotes"
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }


        });
        let noteJSON= await response.json();
        
        setnotes(noteJSON)
    }

    const addNote = async (title,description,tag)=>{
        let url = "http://localhost:5000/api/notes/addNote"
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body:JSON.stringify({title,description,tag})


        });
        const note =await response.json()
        setnotes(notes.concat(note))
    }

    const deleteNote= async (id)=>{
        let url = `http://localhost:5000/api/notes/deleteNote/${id}`
        await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }

            


        });
        const newNotes = notes.filter(note=> {return note._id!==id})
        setnotes(newNotes)
    }

    const editNote= async (id, title, description,tag)=>{
        let url = `http://localhost:5000/api/notes/updateNote/${id}`
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body:JSON.stringify({title,description,tag})




        });
        const UpdateNote= await response.json()
        const PrevNotes = notes.filter(note=> {return note._id!==id})
        setnotes(PrevNotes.concat(UpdateNote))
        
    }



    const [alert, setalert] = useState(null)

    const UpdateAlert=(type,msg)=>{
        setalert({
            type:type,
            message:msg
        })
    }


    return (
        <div>
            <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote,alert,UpdateAlert}}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}

export default NoteState
