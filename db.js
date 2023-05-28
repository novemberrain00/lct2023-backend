import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: '194.58.98.232:443',
  port: 5432,
  database: 'lct2023'
});

pool.connect(function(err) {
  if (err) throw(err);
  console.log("Connected!");  
});
export {pool};