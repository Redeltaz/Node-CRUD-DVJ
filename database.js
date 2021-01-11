const mysql = require('mysql')

const sql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_MDP,
    database: process.env.DB_NAME
})

sql.connect((err) => {
    if(err){
        throw err;
    }
    console.log("database connected")
})

module.exports = sql