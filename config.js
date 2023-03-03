const fs = require("fs");
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USUARIOSQL,
    password: process.env.PASSSQL,
    database: process.env.DATABASESQL,
    host: process.env.HOSTSQL,
    port: 3306,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  },
  test: {
    username: process.env.USUARIOSQL,
    password: process.env.PASSSQL,
    database: process.env.DATABASESQL,
    host: process.env.HOSTSQL,
    port: 3306,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  },
  production: {
    username: process.env.USUARIOSQL,
    password: process.env.PASSSQL,
    database: process.env.DATABASESQL,
    host: process.env.HOSTSQL,
    port: 3306,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  },
};
