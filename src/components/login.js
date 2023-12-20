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
        <>
            <h1>Adopt-a-Dog</h1>
            <form onSubmit={handleLogin}>
                <input type='text' value={name} 
                onChange={event=>setName(event.target.value)}
                placeholder="Name" required />
                <input type='email' value={email} 
                onChange={event=>setEmail(event.target.value)}
                placeholder="Email" required />
                <button type="submit">Login</button>
            </form>

        </>
    )
}