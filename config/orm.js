const connection = require("./connection");

function arrayObjectHelper(object){
    array = [];
    for(let key in object){
        array.push(object[key]);
    }
    return array.join(", ");
}
let orm ={
    // table 1: which table in the database to add a row to
    // cols: string listing the columns we are providing data for
    // values: an array of literal values for the column headings
    // cb: callback function
    createRow: (table1, cols, values, cb)=>{
        let sql = "INSERT INTO ?? (?) ";
        sql += "VALUES (?)";
        connection.query(sql, [table1, cols, arrayObjectHelper(values)], (err, res)=>{
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
        let sql = "DELETE FROM ?? WHERE ?";
        connection.query(sql, [table1, whereCondition], (err, res)=>{
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
        let sql = "SELECT * FROM ??";
        // sql += "ORDER BY ??.?";

        connection.query(sql, [table1], (err, res)=>{
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
        let sql = "SELECT ? FROM ?? ";
        sql += "WHERE ?";

        connection.query(sql, [cols, table1, whereCondition], (err, res)=>{
            if(err){
                console.log(`Find One: ${err}`);
            } else{
                cb(res);
            }
        });
    },
    // table1: table to search through and update
    // setCondition: object with key: value pairs specifying the changes to make inside a row
    // whereCondition: object with key: value pairs specifying the rows we want the changes to be made in
    // cv: callback function
    updateRow: (table1, setCondition, whereCondition, cb)=>{
        let sql = "UPDATE ?? ";
        sql += "SET ? WHERE ?";

        connection.query(sql, [table1, setCondition, whereCondition], (err, res)=>{
            if(err){
                console.log(`Update Row: ${err}`);
            } else{
                cb(res);
            }
        })
    }
}

module.exports = orm;