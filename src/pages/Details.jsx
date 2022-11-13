import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Pet from '../components/Pet';
import { useQuery } from '@tanstack/react-query'; //this is comp to make auth state to work
import usePet from '../hooks/usePet';
import Carsoul from '../components/Carsoul';
import Modal from '../components/Modal';
import AdoptedPetContext from '../contexts/AdoptedPetContext';

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [,setAdoptedPet] = useContext(AdoptedPetContext);
  // console.log(contextValue);

  let petQuery = usePet(id);
  let pet = petQuery?.data?.pets[0];

  return (
    <div className="details">
      {petQuery.isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {petQuery.isError && <h2>{petQuery.error.message}</h2>}
      {petQuery.data && (
        <div>
          <Carsoul images={pet.images} />
          {/* {console.log(active)} */}
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </button>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                    >Yes</button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};
export default Details;
