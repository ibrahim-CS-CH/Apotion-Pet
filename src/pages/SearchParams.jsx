import { useState, useEffect, useContext } from 'react';
import useBreedList from '../hooks/userBreadList';
import Results from '../components/Result';
import Error from '../components/Error';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
import AdoptedPetContext from '../contexts/AdoptedPetContext';


const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [adoptedPet] = useContext(AdoptedPetContext)

  const breedsQuery = useBreedList(animal);
  const breeds = breedsQuery?.data?.breeds ?? [];

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
    setBreed('');
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  const fetchPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="search-params" >
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          fetchPets();
        }}
      >
        {adoptedPet && (
          <div className='pet image-container'>
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
        </div>
        )}
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={handleAnimalChange}>
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={handleBreedChange}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Error>
        <Results pets={pets} />
      </Error>
    </div>
  );
};

export default SearchParams;
