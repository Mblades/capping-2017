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
    host: '10.10.7.151',
    database: 'Capping2017',
    password: 'Capping2017',
    port: 5432,
    idleTimeoutMillis: 1000,
    min: 4,
    max: 20
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

app.get('/', function(request, response) {
    response.send('Express Works');
});
//  API to get all em[ployees from the employee table, this is used
//  on the home screen when generating profile boxes
app.get('/api/get-all-employees', function(request, response) {
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM get_all()', (err, res) => {
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
//  The login API
app.post('/api/pass-check', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM pass_check($1, $2)', [username, password], (err, res) => {
                done();
                if(err){
                    return response.status(400).send(err);
                } else {
                    db.end();
                    response.status(201).send(res);
                }
            })
        }
    })
});
//The delete employee API
app.post('/api/delete-employee', function(request, response) {
    var eid = request.body.eid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM delete_employee($1)', [eid], (err, res) => {
                done();
                if(err){
                    return response.status(400).send(err);
                } else {
                    db.end();
                    response.status(201).send(res);
                }
            })
        }
    })
});
//The add employee API
app.post('/api/add-employee', function(request, response) {
    var eid = request.body.eid | '123';
    var mid = request.body.mid | '123';
    var first = request.body.first | 'test';
    var last = request.body.last | 'Ltest';
    var phone = request.body.phone | '1231231234';
    var address = request.body.address | '1234 trest 234';
    var title = request.body.title | 'TESTER';
    var dob = request.body.dob | '10/08/1996';
    var roleId = request.body.roleId | '123421';
    var city = request.body.city | 'test';
    var organization = request.body.organization | 'test';
    var email = request.body.email | 'test';
    var location = request.body.location | 'test';
    var description = request.body.description | 'test';
    var pic =request.body.pic | 'test';
    var accessLevel = request.body.accessLevel | 'test';
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
                [eid, mid, first, last, phone, address, title, dob, roleId, city, organization, email, location, description, pic, accessLevel], (err, res) => {
                done();
                if(err){
                    return response.status(400).send(err);
                } else {
                    db.end();
                    response.status(201).send(res);
                }
            })
        }
    })
});
//Logs the port that the APIs are currently listening to
//app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));
app.listen(PORT, () => console.log('Listening on port ' + PORT));