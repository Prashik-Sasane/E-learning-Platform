const mysql = require('mysql2');

let connection;

const connectDB = () => {
    connection = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     database: process.env.DB_NAME
    })
    connection.getConnection((err) =>{
      if(err){
        console.error("MySQL connection failed:", err.message)
      } else{
        console.log("MySQL connection is successfully");
      }
    })
};

const getDB = () => connection;

module.exports= {connectDB , getDB};

