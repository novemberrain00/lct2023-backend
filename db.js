import mysql from 'mysql';

let conn = mysql.createConnection({
  host     : '194.58.98.232',
  user     : 'root',
  database : 'lct2023',
  password : 'Lct2023lctdb*'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");  
});

export {conn};
