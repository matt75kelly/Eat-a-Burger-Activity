const connection = require("./connection");

let orm ={
    // table 1: which table in the database to add a row to
    // cols: string listing the columns we are providing data for
    // values: an array of literal values for the column headings
    // cb: callback function
    createRow: (table1, cols, values, cb)=>{
        let sql = `INSERT INTO ${table1} (${cols.join(", ")}) VALUES`;
        for(let i = 0; i < values.length; i++){
            sql += ` ("${values[i].join('", "')}"),`;
        }
        let sqlQuery = sql.slice(0, sql.length-1);
        connection.query(sqlQuery, (err, res)=>{
            if(err){
                console.log(`Row Creation: ${err}`);
            } else{
                cb(res);
            }
        });
    },
    // table1: which table in the database to delete a row
    // whereCondition: object of key: value pairs which will identify the rows to delete
    //cb: callback function
    delete: (table1, whereCondition, cb)=>{
        let sql = `DELETE FROM ${table1} WHERE ?`;
        connection.query(sql, [whereCondition], (err, res)=>{
            if(err){
                console.log(`Deletion: ${err}`);
            } else{
                cb(res);
            }
        });
    },
    // table1: tables to search through
    // orderCondition: string to specify the column to order by and how to order
    // cb: callback function
    findAll: (table1, orderCondition, cb)=>{
        let sql = `SELECT * FROM ${table1}`;
        // sql += "ORDER BY ??.?";

        connection.query(sql, (err, res)=>{
            if(err){
                console.log(`Find All: ${err}`);
            } else{
                cb(res);
            }
        });
    },
    // table 1: table to search through
    // cols: string of the column headings we are pulling
    // whereCondition: object with key: value pairs that specify what to pull
    // orderCondition: string to specify the column to order by and how to order
    // cb: callback function
    findOne: (table1, cols, whereCondition, orderCondition, cb)=>{
        let sql = `SELECT ${cols} FROM ${table1} WHERE ?`;
        connection.query(sql, [whereCondition], (err, res)=>{
            if(err){
                console.log(`Find One: ${err}`);
            } else{
                // console.log(res[0].id);
                cb(res[0].id);
            }
        });
    },
    // table1: table to search through and update
    // setCondition: object with key: value pairs specifying the changes to make inside a row
    // whereCondition: object with key: value pairs specifying the rows we want the changes to be made in
    // cv: callback function
    updateRow: (table1, setCondition, whereCondition, cb)=>{
        let sql = `UPDATE ${table1} SET ? WHERE ?`;

        connection.query(sql, [setCondition, whereCondition], (err, res)=>{
            if(err){
                console.log(`Update Row: ${err}`);
            } else{
                cb(res);
            }
        })
    }
}

module.exports = orm;