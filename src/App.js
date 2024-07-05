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
  EQUIPMENT_CREATE,
  DEPARTMENT_READ,
  USER_CREATE,
  DEPARTMENT_CREATE,
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
import DevZone from './pages/DevZone';
import ImportEquipmentsByExcel from './pages/ImportEquipmentsByExcel';
import Department from './pages/Department/Department';
import DetailDepartment from './pages/Department/Detail';
import CreateUser from './pages/CreateUser';
import CreateDepartment from './pages/CreateDepartment';
import CreateEquipment from './pages/CreateEquipment';
import BiddingProposal from './pages/BiddingProposal';

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
        path="/users/list_users"
        element={
          <PrivateRoute permission={USER_READ}>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/users/create_user"
        element={
          <PrivateRoute permission={USER_CREATE}>
            <CreateUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/departments/create_department"
        element={
          <PrivateRoute permission={DEPARTMENT_CREATE}>
            <CreateDepartment />
          </PrivateRoute>
        }
      />
      <Route
        path="/equipments/create_equipment"
        element={
          <PrivateRoute permission={DEPARTMENT_CREATE}>
            <CreateEquipment />
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
        path="/departments/list_departments"
        element={
          <PrivateRoute permission={DEPARTMENT_READ}>
            <Department />
          </PrivateRoute>
        }
      />
      <Route
        path="/department/:id"
        element={
          <PrivateRoute permission={DEPARTMENT_READ}>
            <DetailDepartment />
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
        path="/equipments/list_equipments"
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
        path="/equipments/import_equipments_by_excel"
        element={
          <PrivateRoute permission={EQUIPMENT_CREATE}>
            <ImportEquipmentsByExcel />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/proposal"
        element={
          <PrivateRoute permission={BIDDING_READ}>
            <BiddingProposal />
          </PrivateRoute>
        }
      />
      <Route
        path="/shopping/:id"
        element={
          <PrivateRoute permission={BIDDING_READ}>
            <EditBidding />
          </PrivateRoute>
        }
      />
      <Route
        path="/dev_zone"
        element={
          <PrivateRoute>
            <DevZone />
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
