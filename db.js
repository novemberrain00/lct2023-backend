import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'lct2023'
});

pool.connect(function(err) {
  if (err) throw(err);
  console.log("Connected!");  
});
export {pool};