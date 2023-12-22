import React from "react";

const Dog = ({ dog }) => {
    return (
        <div className="dog">
            <h3>{dog.name}</h3>
            {/* <img src={dog.img} alt={dog.name} /> */}
            <p>Age: {dog.age}</p>
            <p>Breed: {dog.breed}</p>
            <p>Zip Code: {dog.zip_code}</p>
        </div>
    );
};

export default Dog;
