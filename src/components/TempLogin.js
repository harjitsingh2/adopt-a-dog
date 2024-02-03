import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('attempting to log in');

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
                console.log('Login successful', data);
                navigate('/search') 
            } else {
                console.log('Login failed')
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="w-full max-w-xs">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-8">Adopt-a-Dog</h1>
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            </div>
        </div>
    )
}