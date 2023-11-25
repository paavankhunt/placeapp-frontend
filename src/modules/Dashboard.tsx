import React, { useCallback, useEffect } from 'react';
import Logout from '../components/Logout';
import PlaceList from './PlaceList';
import { getToken } from '../helpers';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const VerifyUser = useCallback(async () => {
    if (!getToken()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    VerifyUser();
  }, [VerifyUser]);
  return (
    <div>
      <Logout />
      <PlaceList />
    </div>
  );
};

export default Dashboard;
