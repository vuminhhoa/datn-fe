import { DataTypes } from 'sequelize';
import { ROLE_USER } from '../const/roles.js';
import { sequelize } from '../config/sequelizeConfig.js';

const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: ROLE_USER,
    },
  },
  {}
);
export default User;
