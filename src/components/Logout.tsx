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
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
