import React, { useContext } from 'react';
import { AuthContext } from '../context/authentication';

const Logout = () => {
  const { LogoutUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      LogoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      style={{
        backgroundColor: '#f44336',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
