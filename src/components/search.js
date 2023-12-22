import React, { useEffect, useState } from "react";
import Dog from "./Dog";
// import TDog from "./TDog";

export default function Search() {
    // create local state variable for dogs
    const [dogs, setDogs] = useState([]);

    // array of dogs in local state
    const [filteredDogs, setFilteredDogs] = useState([]);
    // track state changes from user input of breed
    const [breedFilter, setBreedFilter] = useState();

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
                console.log('Retrieved single dog data successfully');
                // console.log(data);
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
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/search?size=100', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                // body: {size: 100},
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Retrieved dogs successfully:');
                console.log(data);
                
                const dogIds = Object.values(data.resultIds).flat();
                // make API call to fetchADog after we have created an array of ids
                const dogDetails = await fetchADog(dogIds);
                // Update the state with the dog details
                setDogs(dogDetails); 
                // Initially all dogs are displayed
                setFilteredDogs(dogDetails);
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

    const handleBreedFilterChange = (event) => {
        const selectedBreed = event.target.value;
        setBreedFilter(selectedBreed);

        // Filter the dogs based on the selected breed
        const filtered = dogs.filter(dog => dog.breed === selectedBreed || selectedBreed === "");
        setFilteredDogs(filtered);
    };

    return (
        <>
            <h1>Search for your next dog!</h1>

            <div>
                <label htmlFor="breedFilter">Filter by Breed:</label>
                <select id="breedFilter" value={breedFilter} onChange={handleBreedFilterChange}>
                    <option value="">All Breeds</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Silky Terrier">Silky Terrier</option>
                    <option value="Soft-coated Wheaten Terrier">Soft-coated Wheaten Terrier</option>
                </select>
            </div>

            <div className="dogs">
                {filteredDogs.map((dog, index) => (
                     <Dog key={index} dog={dog}/>
                    //  <TDog key={index} dog={dog}/>
                ))}
            </div>
        </>
    );
}
