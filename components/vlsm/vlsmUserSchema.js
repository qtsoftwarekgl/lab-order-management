const sequelize = require("sequelize");
const db = require("../../config/mysql");

const VlsmUser = db.define("vlsm_users", {
  username: {
    type: sequelize.STRING,
    trim: true
  },
  password: {
    type: sequelize.STRING,
    trim: true,
  },
  token: {
    type: sequelize.STRING,
    trim: true,
  }
}, {
  timestamps: false
});

module.exports = VlsmUser;