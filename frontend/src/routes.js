import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import AppLayout from './layout/Layout';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import EditProfile from './pages/Profile/Edit';

import { permissions } from './const/permissionConsts';

const AppRoutes = () => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout permission={permissions.PROFILE_READ}>
              <Profile />
            </AppLayout>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <AppLayout permission={permissions.PROFILE_EDIT}>
              <EditProfile />
            </AppLayout>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route
          exact
          path="*"
          element={
            !!accessToken ? (
              <AppLayout>
                <NotFound />
              </AppLayout>
            ) : (
              <NotFound />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
