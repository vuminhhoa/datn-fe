import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import { permissions } from './const/permissionConsts';
import Profile from './pages/Profile';
import EditProfile from './pages/Profile/Edit';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute permission={permissions.DASHBOARD_READ}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute permission={permissions.PROFILE_SETTING}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <PrivateRoute permission={permissions.PROFILE_SETTING}>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route
        exact
        path="*"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
