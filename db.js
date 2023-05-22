import mysql from 'mysql';

let conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'lct',
  password : ''
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");  
});

export {conn};