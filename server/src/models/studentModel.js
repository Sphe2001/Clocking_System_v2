const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/dbConfig.js");

const Student = sequelize.define("Student", {
  studentNo: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  role_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    default: 3,
  },
  surname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  initials: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  contactNo: {
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

module.exports = Student;
