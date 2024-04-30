import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layout/Layout';
import NotFound from '../pages/NotFound';
import { useApp } from '../contexts/appProvider';

const PrivateRoute = ({ children, permission = null }) => {
  const { user } = useApp();

  const isLoggedIn = Boolean(localStorage.getItem('ACCESS_TOKEN'));

  if (!isLoggedIn || !user) {
    return <Navigate to="/sign-up" />;
  }
  if (permission) {
    const userPermissons = user.Role.Permissions;
    const hasPermission = userPermissons.find(
      (userPermisson) => userPermisson.name === permission
    );

    if (!hasPermission) {
      return (
        <AppLayout>
          <NotFound />
        </AppLayout>
      );
    }
  }

  return <AppLayout>{children}</AppLayout>;
};

export default PrivateRoute;
