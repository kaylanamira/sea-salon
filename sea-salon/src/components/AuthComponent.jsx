import React from 'react';
import useAuth from './useAuth';

const AuthComponent = ({ children, role = null }) => {
  const { session, status } = useAuth(role);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
};

export default AuthComponent;
