import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authentication';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const { LoginToAccount, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      LoginToAccount(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '20rem',
          gap: '1rem',
          backgroundColor: 'lightgray',
          padding: '1rem',
        }}
      >
        <h2>Login</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button onClick={handleLogin}>Log In</button>
        <span>
          <span>Don't have account? </span>
          <Link to={'/signup'}>Sign Up</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
