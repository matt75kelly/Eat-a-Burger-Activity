const connection = require("./connection");

function arrayObjectHelper(array){
    string =``;
    for(let i = 0; i < array.length; i++){
        let newitem = "(";
        newitem += `${array[i].burger_name}, ` || "";
        newitem += `${array[i].burger_patty}, ` || "";
        newitem += `${array[i].patty_count}` || "";
        newitem += `${array[i].burger_id}, ` || "";
        newitem += `${array[i].topping_name}` || "";
        newitem = "), ";
        string += newitem;
    }
    string.substr(0, string.length - 2);
    console.log(string);
    return string;
}
let orm ={
    // table 1: which table in the database to add a row to
    // cols: string listing the columns we are providing data for
    // values: an array of literal values for the column headings
    // cb: callback function
    createRow: (table1, cols, values, cb)=>{
        let sql = `INSERT INTO ${table1} (${cols.toString()})`;
        sql = `VALUES ?`;
        connection.query(sql, arrayObjectHelper(values), (err, res)=>{
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
        connection.query(sql, whereCondition, (err, res)=>{
            if(err){
                console.log(`Deletion: ${err}`);
            } else{
                cb(res);
            }
        });
    },
    // table1 & table 2: tables to join together and search through
    // cols: string of the columns from both tables we are pulling 
    // joinCondition: object that will specify what we will join the tables ON
    // orderCondition: string to specify the column to order by and how to order
    // cb: callback function
    findAll: (table1, table2, cols, joinCondition, orderCondition, cb)=>{
        let sql = `SELECT ${cols} `;
        sql += `FROM ${table1} JOIN ${table2} `;
        sql += `ON ? `;
        sql += `ORDER BY ?`;

        connection.query(sql, joinCondition, orderCondition, (err, res)=>{
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
        let sql = `SELECT ${cols} FROM ${table1} `;
        sql += `WHERE ? ORDER BY ?`;

        connection.query(sql, whereCondition, orderCondition, (err, res)=>{
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
        let sql = `UPDATE ${table1} `;
        sql += `SET ? WHERE ?`;

        connection.query(sql, setCondition, whereCondition, (err, res)=>{
            if(err){
                console.log(`Update Row: ${err}`);
            } else{
                cb(res);
            }
        })
    }
}

module.exports = orm;