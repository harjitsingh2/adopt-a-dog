import React, { useEffect, useState } from "react";
import Dog from "./Dog";

export default function Search() {
    // create local state variable for dogs
    const [dogs, setDogs] = useState([]);

    // fetch details of each dog
    const fetchADog = async (dogIds) => {
        // check if dogIds is an array of the dog's ids
        // console.log(`Dog IDs:`, dogIds);
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                // dogIds is an array of all the Ids of dogs whose data we want to fetch
                body: JSON.stringify(dogIds),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Retrieved single dog data successfully:', data);
                return data;
            } else {
                console.log('Could not retrieve single dog data');
            }
        } catch (error) {
            console.error('Error fetching dog details:', error);
        }
    };

    // fetch dog ids
    const fetchDogs = async () => {
        console.log('Attempting to retrieve dogs');
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/search', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Retrieved dogs successfully:', data);
                
                const dogIds = Object.values(data.resultIds).flat();
                // make API call to fetchADog after we have created an array of ids
                const dogDetails = await fetchADog(dogIds);
                // Update the state with the dog details
                setDogs(dogDetails); 
            } else {
                console.log('Could not retrieve dogs');
            }
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    };

    // run the useEffect once when the component mounts
    useEffect(() => {
        fetchDogs();
    }, []);

    return (
        <>
            <h1>Search for your next dog!</h1>
            <div className="dogs">
                {dogs.map((dog, index) => (
                     <Dog key={index} dog={dog}/>
                ))}
            </div>
        </>
    );
}
