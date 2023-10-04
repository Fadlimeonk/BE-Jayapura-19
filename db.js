const mysql = require('mysql2');
const conn = mysql.createPool({
    host: "containers-us-west-39.railway.app",
    user: "root",
    password: "iJspnELeoDw2euvyslIQ",
    database: "railway",
    //charset: "utf8mb4",
    //timezone: "+07:00",
    port: "7150"
});

conn.getConnection( (err) => {
    if (err) throw err
    console.log('DB Connected');
});

module.exports = conn;