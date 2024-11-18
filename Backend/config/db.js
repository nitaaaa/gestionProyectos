const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',     
    password: '101770893', 
    database: 'sistema_tickets'  
});

module.exports = pool.promise(); 
