import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './modules/Signup';
import Dashboard from './modules/Dashboard';
import Login from './modules/Login';
import AuthState from './context/authentication';
import CreatePlace from './modules/CreatePlace';

const App: React.FC = () => {
  return (
    <Router>
      <AuthState>
        <Routes>
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/place'} element={<CreatePlace />} />
          </>
        </Routes>
      </AuthState>
    </Router>
  );
};

export default App;
