require("dotenv").config();
const mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
};
connection.connect(err=>{
    if(err){
        console.log(`DB Connection: ${err}`);
    }
    else{
        console.log(`\nConnected as id: ${connection.threadId}`);
    }
});

module.exports= connection;