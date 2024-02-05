import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginError('');
        // console.log('attempting to log in');

        // make a POST request to API endpoint 
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email}),
                credentials: 'include'
            })    
            if (response.ok) {
                const data = await response.text();
                // console.log('Login successful', data);
                navigate('/search') 
            } else {
                // console.log('Login failed')
                setLoginError('Login failed. Please check your credentials and enter a valid name and email.')
            }
            
        } catch (error) {
            // console.log(error);
            setLoginError('An error occured. Please try again later.');
        }
    }
    
    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="w-full max-w-xs">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Adopt-a-Dog</h1>
                <div id="instructions">Welcome to Adopt-a-dog! We are here to help you find a shelter dog and bring them to your home. Please log in using a valid email. Then, you can search through our database of dogs and we will generate a match for you.</div>
                <br></br>
                {loginError && <div id="error-message" className="text-red-500">{loginError}</div>}
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="name" 
                            type="text" 
                            placeholder="Name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <div id="disclaimer" className="text-gray-700">
                This website is optimized for use on a desktop or laptop, not a mobile device.
                </div>
            </div>

        </div>
    )
}