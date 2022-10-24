const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyek_41',
    multipleStatements: true
});

koneksi.connect((err) => {
    if (err) throw err;
    console.log('Database terkoneksi');
});

module.exports = db;
