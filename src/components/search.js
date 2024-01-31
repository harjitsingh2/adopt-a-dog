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

    // manage cursor for pagination
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');


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
    const fetchDogs = async (url) => {
        // console.log('Attempting to retrieve dogs');

        const apiUrl = url || `https://frontend-take-home-service.fetch.com/dogs/search?size=10`;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
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

                // Update next url
                setNextUrl(data.next ? 'https://frontend-take-home-service.fetch.com' + data.next : null);
                setPrevUrl(data.prev ? 'https://frontend-take-home-service.fetch.com' + data.prev : null);

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
        // getBreeds();
    }, []);

    const handleBreedFilterChange = (event) => {
        const selectedBreed = event.target.value;
        setBreedFilter(selectedBreed);

        // Filter the dogs based on the selected breed
        const filtered = dogs.filter(dog => dog.breed === selectedBreed || selectedBreed === "");
        setFilteredDogs(filtered);
    };

    // Pagination controls
    const goToNextPage = () => {
        // const cursor = nextUrl.split('&from=')[1];
        // setCurrentCursor(url);
        fetchDogs(nextUrl);
    };
    
    const goToPrevPage = () => {
        fetchDogs(prevUrl);
    };
    

    // get all possible breeds
    const getBreeds = async () => {
        console.log('Attempting to get breeds');
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Retrieved breeds successfully:');
                console.log(data);
                
            } else {
                console.log('Could not retrieve breeds');
            }
        } catch (error) {
            console.error('Error getting breeds:', error);
        }
    };

    const breeds = [
        "Affenpinscher",
        "Afghan Hound",
        "African Hunting Dog",
        "Airedale",
        "American Staffordshire Terrier",
        "Appenzeller",
        "Australian Terrier",
        "Basenji",
        "Basset",
        "Beagle",
        "Bedlington Terrier",
        "Bernese Mountain Dog",
        "Black-and-tan Coonhound",
        "Blenheim Spaniel",
        "Bloodhound",
        "Bluetick",
        "Border Collie",
        "Border Terrier",
        "Borzoi",
        "Boston Bull",
        "Bouvier Des Flandres",
        "Boxer",
        "Brabancon Griffon",
        "Briard",
        "Brittany Spaniel",
        "Bull Mastiff",
        "Cairn",
        "Cardigan",
        "Chesapeake Bay Retriever",
        "Chihuahua",
        "Chow",
        "Clumber",
        "Cocker Spaniel",
        "Collie",
        "Curly-coated Retriever",
        "Dandie Dinmont",
        "Dhole",
        "Dingo",
        "Doberman",
        "English Foxhound",
        "English Setter",
        "English Springer",
        "EntleBucher",
        "Eskimo Dog",
        "Flat-coated Retriever",
        "French Bulldog",
        "German Shepherd",
        "German Short-haired Pointer",
        "Giant Schnauzer",
        "Golden Retriever",
        "Gordon Setter",
        "Great Dane",
        "Great Pyrenees",
        "Greater Swiss Mountain Dog",
        "Groenendael",
        "Ibizan Hound",
        "Irish Setter",
        "Irish Terrier",
        "Irish Water Spaniel",
        "Irish Wolfhound",
        "Italian Greyhound",
        "Japanese Spaniel",
        "Keeshond",
        "Kelpie",
        "Kerry Blue Terrier",
        "Komondor",
        "Kuvasz",
        "Labrador Retriever",
        "Lakeland Terrier",
        "Leonberg",
        "Lhasa",
        "Malamute",
        "Malinois",
        "Maltese Dog",
        "Mexican Hairless",
        "Miniature Pinscher",
        "Miniature Poodle",
        "Miniature Schnauzer",
        "Newfoundland",
        "Norfolk Terrier",
        "Norwegian Elkhound",
        "Norwich Terrier",
        "Old English Sheepdog",
        "Otterhound",
        "Papillon",
        "Pekinese",
        "Pembroke",
        "Pomeranian",
        "Pug",
        "Redbone",
        "Rhodesian Ridgeback",
        "Rottweiler",
        "Saint Bernard",
        "Saluki",
        "Samoyed",
        "Schipperke",
        "Scotch Terrier",
        "Scottish Deerhound",
        "Sealyham Terrier",
        "Shetland Sheepdog",
        "Shih-Tzu",
        "Siberian Husky",
        "Silky Terrier",
        "Soft-coated Wheaten Terrier",
        "Staffordshire Bullterrier",
        "Standard Poodle",
        "Standard Schnauzer",
        "Sussex Spaniel",
        "Tibetan Mastiff",
        "Tibetan Terrier",
        "Toy Poodle",
        "Toy Terrier",
        "Vizsla",
        "Walker Hound",
        "Weimaraner",
        "Welsh Springer Spaniel",
        "West Highland White Terrier",
        "Whippet",
        "Wire-haired Fox Terrier",
        "Yorkshire Terrier"
    ]


    return (
        <>
            <h1 className="text-blue-500">Search for your next dog!</h1>

            <div>
                <label htmlFor="breedFilter">Filter by Breed:</label>
                <select id="breedFilter" value={breedFilter} onChange={handleBreedFilterChange}>
                    <option value="">All Breeds</option>
                    {breeds.map((breed) => (
                        <option value={breed}>{breed}</option>
                    ) )}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDogs.map((dog, index) => (
                     <Dog key={index} dog={dog}/>
                    //  <TDog key={index} dog={dog}/>
                ))}
            </div>

            <div id="pagination">
                <button onClick={goToPrevPage} disabled={!prevUrl}>Previous</button>
                <button onClick={goToNextPage} disabled={!nextUrl}>Next</button>
            </div>
        </>
    );
}
