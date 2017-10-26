// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const pg = require('pg');
const PORT = 3000;

const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Capping',
    password: 'mattsoccer10',
    port: 5432,
});
/*
pool.connect((err, db, done) => {
    if(err){
        return console.log(err);
    } else {
        db.query('SELECT * FROM employees', (err, res) => {
            if(err) {
                return console.log(err);
            } else {
                console.log(res.rows[0]);
            }
        })
    }
})
*/
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
//36:36
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

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

app.post('/api/add-employees', function(request, response) {
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
    //use for insert into 38:00
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));