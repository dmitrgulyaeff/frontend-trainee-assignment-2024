import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}
