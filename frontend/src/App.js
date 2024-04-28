// @ts-nocheck
import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import { permissionsConsts } from './const/permissionConsts';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ListRole from './pages/Role';
import DetailRole from './pages/Role/Detail';
import DetailUser from './pages/User/Detail';
import EditRole from './pages/Role/Edit';
import Bidding from './pages/Bidding';
import EditBidding from './pages/Bidding/Edit';
import User from './pages/User';
import Equipment from './pages/Equipment';
import DetailEquipment from './pages/Equipment/Detail';

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
        path="/users"
        element={
          <PrivateRoute permission={permissionsConsts.USER_READ}>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <PrivateRoute permission={permissionsConsts.USER_UPDATE}>
            <DetailUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <ListRole />
          </PrivateRoute>
        }
      />

      <Route
        path="/role/:id"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <DetailRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/role/edit/:id"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <EditRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/bidding"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <Bidding />
          </PrivateRoute>
        }
      />
      <Route
        path="/equipments"
        element={
          <PrivateRoute permission={permissionsConsts.EQUIPMENT_READ}>
            <Equipment />
          </PrivateRoute>
        }
      />
      <Route
        path="/equipment/:id"
        element={
          <PrivateRoute permission={permissionsConsts.EQUIPMENT_READ}>
            <DetailEquipment />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/non-bidding"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <Bidding />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/bidding/:id"
        element={
          <PrivateRoute permission={permissionsConsts.SYSTEM_SETTING}>
            <EditBidding />
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
