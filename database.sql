CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  surname varchar(255),
  fathername varchar(255),
  email varchar(255) ,
  company_name varchar(255) ,
  inn varchar(10) ,
  website varchar(255) ,
  industry varchar(255) ,
  country varchar(255) ,
  city varchar(255) ,
  job varchar(255) ,
  password varchar(255) 
);