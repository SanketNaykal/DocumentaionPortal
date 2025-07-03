import { Prev } from "react-bootstrap/esm/PageItem";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "./register.scss";
/* interface ErrorResponse {
    message: string; // Adjust this based on the actual structure of your error response
} */

function register() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [err, setError] = useState<string | null>(null);
    const navigate = useNavigate();
                        // Define the type for the event parameter 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> { 
        setInputs(prev=> ({ ...prev, [e.target.name]: e.target.value }))
    }
                        // Define the type for the event parameter 
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auths/register", inputs);
            console.log(res)
            setError(null) // Clear any previous error message
            navigate("/login"); // Redirect to the login page after successful registration

        }
        catch (err) {
            const error = err as AxiosError< { message: string }>;
            if (error.response && error.response.data){
                setError(error.response.data.message);
            } else {
                setError("An unknown error occurred.");
                setError(null)
            }
                // setError((err as any).response.data.message);
        }
        
    }; 

    return (
        <Fragment>
            <div className="container-fluid d-xxl-flex justify-content-center align-items-center">
                <div className="justify-content-center bg-gray-100">
                    <h1 className="text-3xl text-center font-bold mb-4">Register</h1>
                    <form className="bg-body-tertiary p-5 rounded shadow w-96 align-items-center">
                        <div className="row mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="username">
                                Username
                            </label>
                            <input type="text" id="username" name ="username" className="border border-gray-300 p-2 w-full rounded" onChange={handleChange}/>
                        </div>
                        <div className="row mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input type="email" id="email" name ="email" className="border border-gray-300 p-2 w-full rounded" onChange={handleChange}/>
                        </div>
                        <div className="row mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <input type="password" id="password" name ="password" className="border border-gray-300 p-2 w-full rounded" onChange={handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary py-2 px-4 rounded hover:bg-blue-600 transition duration-200" onClick={handleSubmit}>
                            Register
                        </button>
                        <div className="text-center mt-4">
                            <p className="text-danger">{err}</p>
                            <p className="text-gray-600">Already have an account? <a href="#login" className="text-blue-500 hover:underline">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );    
}

export default register;

// Removed conflicting local useState function
