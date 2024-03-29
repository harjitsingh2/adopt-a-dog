import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dog from "./Dog.js";
import { MatchContext } from "../context/MatchContext.js";
import Logout from "./Logout.js";

export default function Search() {
    
    const navigate = useNavigate();

    // create local state variable for dogs
    const [dogs, setDogs] = useState([]);

    // array of dogs in local state
    const [filteredDogs, setFilteredDogs] = useState([]);
    // track state changes from user input of breed
    const [breedFilter, setBreedFilter] = useState();

    // handle sorting
    const [sortBreed, setSortBreed] = useState('asc');
    const [sortName, setSortName] = useState('asc');


    // manage cursor for pagination
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    // manage favorites by user
    const [favorites, setFavorites] = useState([]);

    // use context to set match
    const { setMatch } = useContext(MatchContext);


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
                // console.log('Retrieved single dog data successfully');
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
    const fetchDogs = async (url, breed = null) => {
        // console.log('Attempting to retrieve dogs');
        
        let apiUrl = url || `https://frontend-take-home-service.fetch.com/dogs/search?size=20&sort=breed:${sortBreed}`;

        // add breed to query parameters
        if (breed) apiUrl += `&breeds=${encodeURIComponent(breed)}`
        
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                // console.log('Retrieved dogs successfully:');
                // console.log(data);
                
                const dogIds = Object.values(data.resultIds).flat();
                // make API call to fetchADog after we have created an array of ids
                const dogDetails = await fetchADog(dogIds);

                // sort dogs based on user preference
                const sortedDogs = applySorting(dogDetails);
                // Update the state with the dog details
                setDogs(sortedDogs); 
                // setDogs(dogDetails); 
                // Initially all dogs are displayed
                setFilteredDogs(sortedDogs);
                // setFilteredDogs(dogDetails);

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
    }, [sortBreed]);

    useEffect(() => {
        if (filteredDogs.length > 0) {
            const sortedDogs = applySorting(filteredDogs);
            setFilteredDogs(sortedDogs);
        }
    }, [sortBreed, sortName]);
    

    const handleBreedFilterChange = async (event) => {
        const selectedBreed = event.target.value;
        setBreedFilter(selectedBreed);

        // Filter the dogs based on the selected breed. no longer need this because now we are making an api fetch for dogs after user changes breed filter
        // const filtered = dogs.filter(dog => dog.breed === selectedBreed || selectedBreed === "");
        // setFilteredDogs(filtered);

        // call fetchDogs when breed is changed
        if (selectedBreed) {
            await fetchDogs(null, selectedBreed);
        } else {
            await fetchDogs();
        }
    };

    // handle sorting
    const applySorting = (dogs) => {
        let sortedDogs = [...dogs]
        
        sortedDogs.sort((a, b) => {
            if (sortBreed === 'asc') {
                return a.breed.localeCompare(b.breed) || (sortName === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            }
            if (sortBreed === 'desc') return b.breed.localeCompare(a.breed) || (sortName === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            if (sortName === 'asc') return b.name.localeCompare(a.breed) || (sortName === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            if (sortName === 'desc') return b.name.localeCompare(a.breed) || (sortName === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            
        });

        return sortedDogs;
    };

    
    

    // Pagination controls
    const goToNextPage = () => {
        // const cursor = nextUrl.split('&from=')[1];
        // setCurrentCursor(url);
        fetchDogs(nextUrl);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    
    const goToPrevPage = () => {
        fetchDogs(prevUrl);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // add dogs to favorites
    const addFavorites = (dogId) => {
        setFavorites(prevFavorites => {
            // Check if the dog is already in favorites
            if (prevFavorites.includes(dogId)) {
                // If so, remove it from array
                return prevFavorites.filter(favId => favId !== dogId);
            } else {
                // Otherwise, add it to array
                return [...prevFavorites, dogId];
            }
        })
    }

    // generate a match
    const match = async () => {
        if (favorites.length === 0) {
            console.log('must add favorites to be matched');
            return;
        }
        
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(favorites),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setMatch(data);
                // console.log('Retrieved a successful match');
                // console.log(data);
                navigate('/match');
            } else {
                console.log('Could not find a match');
            }
        } catch (error) {
            console.error('Error finding a match:', error);
        }
    }
    

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
            <h1 className="text-blue-500 text-3xl font-bold text-center my-6">Search for your next dog!</h1>

            <div>
                <div>
                    <label htmlFor="breedFilter" className="ml-5 mr-2 font-medium">Filter by Breed:</label>
                    <select id="breedFilter" value={breedFilter} onChange={handleBreedFilterChange} className="rounded border border-gray-300 p-2">
                        <option value="">All Breeds</option>
                        {breeds.map((breed) => (
                            <option value={breed}>{breed}</option>
                        ) )}
                    </select>
                </div>
                <br></br>
                <div>
                    <label htmlFor="sortBreed" className="ml-5 mr-2 font-medium">Sort by Breed:</label>
                    <select id="sortBreed" value={sortBreed} disabled={breedFilter ? true : false} onChange={e => setSortBreed(e.target.value)} className="rounded border border-gray-300 p-2">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                <br></br>
                    <label htmlFor="sortName" className="ml-5 mr-2 font-medium">Sort by Name:</label>
                    <select id="sortName" value={sortName} onChange={e => setSortName(e.target.value)} className="rounded border border-gray-300 p-2">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            


            <div className="text-center">
                Match me with a dog based on my favorites: <button onClick={match} disabled={favorites.length === 0 ? true : false} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500">Generate a Match</button>
            </div>

            <div id="pagination" className="flex justify-center items-center gap-4 my-4">
                <button onClick={goToPrevPage} disabled={!prevUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500">Previous</button>
                <button onClick={goToNextPage} disabled={!nextUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500">Next</button>
            </div>

            <div className="flex justify-center gap-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDogs.map((dog, index) => (
                        <Dog key={index} dog={dog} addFavorites={addFavorites} favorites={favorites}/>
                        //  <TDog key={index} dog={dog}/>
                    ))}
                </div> 
            </div>
            

            <div id="pagination" className="flex justify-center items-center gap-4 my-4">
                <button onClick={goToPrevPage} disabled={!prevUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500">Previous</button>
                <button onClick={goToNextPage} disabled={!nextUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200 disabled:text-gray-500">Next</button>
            </div>

            <div>
                <Logout />
            </div>
        </>
    );
}
