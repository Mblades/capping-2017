// server/index.js
/* This is where all of the APIs will be housed */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const pg = require('pg');
const PORT = 3000;

const { Pool, Client } = require('pg');
//This is the connection information for the database
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Capping',
    password: 'mattsoccer10',
    port: 5432,
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});
//  API to get all em[ployees from the employee table, this is used
//  on the home screen when generating profile boxes
app.get('/api/get-all-employees', function(request, response) {
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM employees', (err, res) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    console.log('Data Got');
                    db.end();
                    response.status(201).send(res);
                }
            });
        }
    })
});
//  This is the start of the login API but it still needs work
app.get('/api/login', function(request, response) {
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM singlesignon WHERE eid = #### AND password = ++++++', (err, res) => {
                done();
                if(err){
                    return response.status(400).send(err);
                } else {
                    console.log('Correct');
                    db.end();
                    response.status(201).send(res);
                }
            })
        }
    })
});
//Logs the port that the APIs are currently listening to
app.listen(PORT, () => console.log('Listening on port ' + PORT));