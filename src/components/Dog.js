import React, {useEffect} from "react";

const Dog = ({ dog, addFavorites, favorites }) => {

    const isFavorited = favorites.includes(dog.id);

    const handleFavoriteClick = () => {
        addFavorites(dog.id);
    };

    // useEffect(() => {
    //     console.log("Updated favorites:", favorites);
    // }, [favorites]);
    
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 hover:shadow-xl transition-shadow duration-300">
            {/* <img className="w-full" src={dog.img} alt={dog.name} /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{dog.name}</div>
                <p className="text-gray-700 text-base">
                    Age: {dog.age}
                </p>
                <p className="text-gray-700 text-base">
                    Breed: {dog.breed}
                </p>
                <p className="text-gray-700 text-base">
                    Zip Code: {dog.zip_code}
                </p>
                <label>
                    Add to Favorites <input onChange={handleFavoriteClick} checked={isFavorited} type="checkbox"/>
                </label>
            </div>
        </div>
    );
};

export default Dog;

