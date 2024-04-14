import React, {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react';

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuth: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('authToken') === '12345',
  );

  useEffect(() => {
    if (!isAuth) localStorage.removeItem("authToken")
  }, [isAuth])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
