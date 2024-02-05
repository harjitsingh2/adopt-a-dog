import React, { useContext, useEffect, useState } from "react";
import { MatchContext } from "../context/MatchContext.js";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout.js";

const Match = () => {
    
    const { match } = useContext(MatchContext);
    // console.log(match);

    const [dog, setDog] = useState();
    const navigate = useNavigate();

    // fetch details for matched dog
    const fetchADog = async () => {
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify([match.match]),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                // console.log('Retrieved single dog data successfully');
                // console.log(data);
                // console.log(data[0]);
                setDog(data[0]);
            } else {
                // console.log('Could not retrieve single dog data');
            }
        } catch (error) {
            console.error('Error fetching dog details:', error);
        }
    };

    useEffect(() => {
        if (match && match.match) {
           fetchADog(); 
        }
        
    }, [match]);

    // return to search page
    const returnSearch = () => {
        navigate('/search');
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
            {dog ? (
                <div>
                    <h1 className="text-3xl font-bold text-blue-700 mb-6">You matched with {dog.name}!</h1>
                    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white p-6">
                        <img className="w-full h-48 object-cover object-center mb-4" src={dog.img} alt={dog.name} />
                        {/* <p className="text-xl font-medium text-800">Name: {dog.name}</p> */}
                        <p className="text-md text-700">Breed: {dog.breed}</p>
                        <p className="text-md text-700">Age: {dog.age}</p>
                        <p className="text-md text-700 mb-4">Zip Code: {dog.zip_code}</p>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-700">Loading your match...</p>
            )}
    
            <button onClick={returnSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                Return to Search
            </button>
            <br></br>
            <Logout />
        </div>
    );
    
  };
  
  export default Match;