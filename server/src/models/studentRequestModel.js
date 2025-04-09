const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/dbConfig");

const studentRequest = sequelize.define("studentRequestModel", {
    studentNo: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    reason: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    isViewed: {
      type: DataTypes.BOOLEAN,
      default: false,
    }
  });

  module.exports = studentRequest;