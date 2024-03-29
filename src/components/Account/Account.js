import React, { useState, useEffect } from 'react';
import EditModal from '../EditModal/EditModal';
import { useDispatch } from 'react-redux';
import { setUserName as setUserNameAction } from '../../redux/Actions/UserName';
import TransactionCard from '../TransactionCard/TransactionCard';


const Account = () => {

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const profileFetch = async () => {
    const token = localStorage.getItem('token'); // Récupère le token du localStorage

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`); // Lance une erreur si la réponse n'est pas ok
      }

      const data = await response.json();
      console.log(data)

      
      setFirstName(data.body.firstName); 
      setLastName(data.body.lastName);
      setUserName(data.body.userName);

      dispatch(setUserNameAction(data.body.userName));

    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  };

  useEffect(() => {
    profileFetch();
  }, []); 

  const EditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const handleUserNameUpdate = () => {
    profileFetch();
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName} ( {userName} )</h1>
        <button className="edit-button" onClick={EditButtonClick}>Edit Name</button>
        <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onUserNameUpdate={handleUserNameUpdate} />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <div>
      <TransactionCard
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <TransactionCard
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <TransactionCard
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </div>
    </main>
  );
}

export default Account;