import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import { permissionsConsts } from './const/permissionConsts';
import Profile from './pages/Profile';
import EditProfile from './pages/Profile/Edit';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ListRole from './pages/Settings/Role';
import DetailRole from './pages/Settings/Role/Detail';
import DetailUser from './pages/User/Detail';
import EditUser from './pages/User/Edit/Edit';
import EditRole from './pages/Settings/Role/Edit';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute permission={permissionsConsts.DASHBOARD_READ}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute permission={permissionsConsts.PROFILE_SETTING}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <PrivateRoute permission={permissionsConsts.USER_READ}>
            <DetailUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/edit/:id"
        element={
          <PrivateRoute permission={permissionsConsts.USER_UPDATE}>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <PrivateRoute permission={permissionsConsts.PROFILE_SETTING}>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/roles-settings"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <ListRole />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings/roles/:id"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <DetailRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/roles/edit/:id"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <EditRole />
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
