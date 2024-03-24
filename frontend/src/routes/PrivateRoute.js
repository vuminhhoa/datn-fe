import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layout/Layout';
import NotFound from '../pages/NotFound';
import { useAuth } from '../contexts/authProvider';

const PrivateRoute = ({ children, permission }) => {
  const { user } = useAuth();

  const isLoggedIn = Boolean(localStorage.getItem('ACCESS_TOKEN'));

  const userPermissons = user.Role.Permissions;
  const hasPermission = userPermissons.find(
    (userPermisson) => userPermisson.alias === permission
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (!hasPermission) {
    return (
      <AppLayout>
        <NotFound />
      </AppLayout>
    );
  }

  return <AppLayout>{children}</AppLayout>;
};

export default PrivateRoute;
