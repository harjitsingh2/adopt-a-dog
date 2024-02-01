import React, { useContext, useEffect, useState } from "react";
import { MatchContext } from "../context/MatchContext";
import { useNavigate } from "react-router-dom";

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
                console.log('Retrieved single dog data successfully');
                console.log(data);
                console.log(data[0]);
                setDog(data[0]);
            } else {
                console.log('Could not retrieve single dog data');
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
        <div>
            <h1>Your Matched Dog</h1>
            {dog ? (
                <div>
                    <p>Name: {dog.name}</p>
                    <p>Breed: {dog.breed}</p>
                    <p>Age: {dog.age}</p>
                    <p>Zip Code: {dog.zip_code}</p>
                    <img src={dog.img} alt={dog.name}/>
                </div>
            ) : (
                <p>Loading your match...</p> // Displayed while waiting for the data
            )}

            <button onClick={returnSearch}>Return to Search</button>
        </div>
    );
  };
  
  export default Match;