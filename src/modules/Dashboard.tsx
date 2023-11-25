import React from 'react';
import Logout from '../components/Logout';
import PlaceList from './PlaceList';

const Dashboard = () => {
  return (
    <div>
      <Logout />
      <PlaceList />
    </div>
  );
};

export default Dashboard;
