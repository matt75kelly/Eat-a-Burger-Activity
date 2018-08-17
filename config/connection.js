const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err=>{
    if(err){
        console.log(`DB Connection: ${err}`);
    }
    else{
        console.log(`Connected to database: ${process.env.DB_NAME}`);
        console.log(`\nConnected as id: ${connection.threadId}`);
    }
});

module.exports= connection;