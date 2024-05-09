// @ts-nocheck
import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import {
  DASHBOARD_READ,
  USER_READ,
  ROLE_READ,
  ROLE_UPDATE,
  BIDDING_READ,
  EQUIPMENT_READ,
  BIDDING_UPDATE,
} from './const/permission';
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
import Activity from './pages/Activity';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute permission={DASHBOARD_READ}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/activities"
        element={
          <PrivateRoute permission={DASHBOARD_READ}>
            <Activity />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute permission={USER_READ}>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <PrivateRoute permission={USER_READ}>
            <DetailUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute permission={ROLE_READ}>
            <ListRole />
          </PrivateRoute>
        }
      />

      <Route
        path="/role/:id"
        element={
          <PrivateRoute permission={ROLE_READ}>
            <DetailRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/role/edit/:id"
        element={
          <PrivateRoute permission={ROLE_UPDATE}>
            <EditRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/bidding"
        element={
          <PrivateRoute permission={BIDDING_READ}>
            <Bidding />
          </PrivateRoute>
        }
      />
      <Route
        path="/equipments"
        element={
          <PrivateRoute permission={EQUIPMENT_READ}>
            <Equipment />
          </PrivateRoute>
        }
      />
      <Route
        path="/equipment/:id"
        element={
          <PrivateRoute permission={EQUIPMENT_READ}>
            <DetailEquipment />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/non-bidding"
        element={
          <PrivateRoute permission={BIDDING_READ}>
            <Bidding />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/bidding/:id"
        element={
          <PrivateRoute permission={BIDDING_UPDATE}>
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
