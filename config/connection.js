require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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