import {
  createContext,
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactPortal,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from '../helpers';

interface LoginProps {
  username: string;
  password: string;
}

const AuthContext = createContext<{
  LoginToAccount: (body: LoginProps) => void;
  LogoutUser: () => void;
  isAuthenticated: Boolean;
  SignUpToAccount: (body: LoginProps) => void;
}>({
  LoginToAccount: function (): Promise<any> {
    throw new Error('Function not implemented.');
  },
  LogoutUser: function (): void {
    throw new Error('Function not implemented.');
  },
  isAuthenticated: false,
  SignUpToAccount: function (): Promise<any> {
    throw new Error('Function not implemented.');
  },
});

const AuthState = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactPortal
    | null
    | undefined;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(true);
  const navigate = useNavigate();
  const VerifyUser = useCallback(async () => {
    if (!getToken()) {
      setIsAuthenticated(false);
      // navigate('/login');
    }
  }, []);

  useEffect(() => {
    VerifyUser();
  }, [VerifyUser]);

  const getApiToken = async (body: LoginProps) => {
    await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data.token) {
          setToken(data.token);
          navigate('/');
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        return error.message;
      });
  };

  const createAccount = async (body: LoginProps) => {
    await fetch(`${process.env.REACT_APP_API_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data.token) {
          setToken(data.token);
          navigate('/');
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        return error.message;
      });
  };

  const LoginToAccount = async (body: LoginProps) => {
    if (!!body.username && !!body.password) {
      await getApiToken(body);
    }
  };

  const SignUpToAccount = async (body: LoginProps) => {
    if (!!body.username && !!body.password) {
      await createAccount(body);
    }
  };

  const LogoutUser = useCallback(() => {
    setIsAuthenticated(false);
    removeToken();
    navigate('/login');
  }, [navigate]);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     LogoutUser();
  //   }
  // }, [LogoutUser, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        LoginToAccount,
        LogoutUser,
        SignUpToAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
export { AuthContext };
