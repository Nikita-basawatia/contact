import React, { useEffect, useState } from 'react';
import { Contactservices } from '../services/Contactservices';
import Spinner from './Spinner';

function Card({ contactData }) {
  console.log("render");

  const [state, setState] = useState({
    loading: false,
    contact: [],
    errorMessage: ''
  });

  const ondelete = async (id) => {
    try {
      await Contactservices.deleteContact(id);
      setState((prevState) => ({
        ...prevState,
        contact: prevState.contact.filter((contact) => contact.id !== id)
      }));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const response = await Contactservices.getAllContacts();
        setState({
          loading: false,
          contact: response.data,
          errorMessage: ''
        });
      } catch (error) {
        setState({
          loading: false,
          contact: [],
          errorMessage: error.message
        });
      }
    };

    fetchData();
  }, [contactData]);

  console.log(state);

  const { loading, contact, errorMessage } = state;
  return (
    loading ? <Spinner /> :
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {contact.length > 0 && 
        contact.map(contact => (
          <div className='card-outer' key={contact.id}>
            <div className='card-inner'>
              <img src="https://via.placeholder.com/150" alt={`${contact.name}'s profile`} className='card-image' />
                    <h2 className='card-name'>{contact.name} {contact.lastname }</h2>
              <p className='card-email'><strong>Email:</strong> {contact.email}</p>
              
              <button onClick={() => ondelete(contact.id)}>Delete</button>
            </div>
          </div>
        ))
      }
    </>
  );
}

export default Card;
