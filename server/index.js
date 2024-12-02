// imports here for express and pg
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_hr_db')
// static routes here (you only need these for deployment)

// app routes here

// create your init function
const init = async () => {
    await client.connect()
    const SQL = `
      DROP TABLE IF EXISTS employees;
      CREATE TABLE employees(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        is_admin BOOLEAN DEFAULT FALSE
      );
      INSERT INTO employees(name, is_admin) VALUES('Laura Palmer', false);
      INSERT INTO employees(name, is_admin) VALUES('Dale Cooper', false);
      INSERT INTO employees(name, is_admin) VALUES('Eric Darnell', true);
      INSERT INTO employees(name, is_admin) VALUES('Ryan Peterson', true);
      INSERT INTO employees(name, is_admin) VALUES('Paul Wolfymaster Sherer', false);

    `
    await client.query(SQL)
    console.log('data seeded')
    const port = process.env.PORT || 3000
    app.listen(port, () => `listening on port ${port}`)


}
// init function invocation
