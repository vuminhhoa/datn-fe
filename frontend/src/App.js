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
import RoleSetting from './pages/Settings/Role';
import PermissionSetting from './pages/Settings/Permission';
import DetailRole from './pages/Settings/Role/Detail';

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
            <RoleSetting />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/permissions-settings"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <PermissionSetting />
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
