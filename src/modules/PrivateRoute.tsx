import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Login';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  path,
  element,
}) => {
  const isAuthenticated = !!Cookies.get('token');

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Route path="/login" element={<Login />} />
  );
};

export default PrivateRoute;
