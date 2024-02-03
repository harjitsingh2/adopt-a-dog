import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                console.log('Logged out successfully');
                navigate('/'); // Redirect to login page after logout
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.error('There is an error with logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log Out
        </button>
    )
}

export default Logout;
