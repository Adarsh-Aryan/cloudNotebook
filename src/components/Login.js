import {React,useContext,useState} from 'react'
import {useNavigate} from "react-router-dom"
import noteContext from '../context/NoteContext';
const Login = () => {
    let navigate =useNavigate();

    const {UpdateAlert}=useContext(noteContext)

    const [credentials,setCredentials] = useState({username:"",password:""})
    const handleChange=(e)=>{
        
        setCredentials({...credentials,[e.target.name]:e.target.value})
        
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        let url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                
            },

            body:JSON.stringify({username:credentials.username,password:credentials.password})


        });

        let res=await response.json();
        if(res.success){
            UpdateAlert("success","Success! Login Successfully")
            navigate("/")
            localStorage.setItem('token',res.token)
            

        }
        else{
            
            navigate("/login")
            UpdateAlert("danger","Error! Please Enter the correct user credentials")

            
        }
        
    }
    return (
        <div className="container my-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Username</label>
                    <input type="email" className="form-control" id="email" name="username" aria-describedby="emailHelp" autoComplete='off' onChange={handleChange}/>
                    <div id="emailHelp" className="form-text">Username is your Registered Email Id</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

