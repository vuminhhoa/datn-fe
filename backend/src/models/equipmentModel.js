import { DataTypes } from "sequelize";
import { ROLE_USER } from "../const/roles.js";
import { sequelize } from "../config/sequelizeConfig.js";

const Equipment = sequelize.define(
  "Equipment",
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: ROLE_USER,
    },
  },
  {},
);
export default Equipment;
