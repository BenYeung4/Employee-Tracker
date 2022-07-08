//MySQL database
const mysql = require("mysql2");

//code that connects the application to MySQL database
const db = mysql.createConnection(
  {
    host: "localhost",
    //Your MySQL username for now it is root,
    user: "root",
    //Your MySQL password
    password: "Comefindme2!",
    database: "election",
  },
  console.log("Connected to the election database.")
);

module.exports = db;
