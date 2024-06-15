import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layout/Layout';
import NotFound from '../pages/NotFound';
import { useAuthContext } from '../contexts/authContext';

const PrivateRoute = ({ children, permission = null }) => {
  const { logoutAction, user } = useAuthContext();

  if (!user) {
    return <Navigate to="/sign-up" />;
  }
  if (permission && user.Role?.name !== 'Quản trị viên') {
    const userPermissons = user.Role?.Permissions;
    if (!userPermissons) {
      logoutAction();
    }
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
