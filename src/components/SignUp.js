import {React,useContext,useState} from 'react'
import {useNavigate} from "react-router-dom"
import noteContext from '../context/NoteContext';

const SignUp = () => {
    let navigate =useNavigate();
    const {UpdateAlert}= useContext(noteContext)
    const [credentials,setCredentials] = useState({name:"", username:"",password:""})
    const handleChange=(e)=>{
        
        setCredentials({...credentials,[e.target.name]:e.target.value})
        
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        let url = "http://localhost:5000/api/auth/createUser"
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                
            },

            body:JSON.stringify({username:credentials.username,password:credentials.password})


        });
        let newRes= await response.json()
        console.log(newRes)
        if(newRes.success){
            
            UpdateAlert("success","Success! SignUp Successfully")
            navigate("/")
            localStorage.setItem('token',newRes.token)
        }
        else{
            navigate("/signup")
            UpdateAlert("danger","Error! Please fill all the details")
        }
    }
    return (
        <div className="container my-3">
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">UserName</label>
                    <input type="email" className="form-control" id="username" name="username" aria-describedby="emailHelp" onChange={handleChange}/>
                    <div id="emailHelp" className="form-text">Username is your Email Id</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default SignUp
