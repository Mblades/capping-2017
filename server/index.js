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
    idleTimeoutMillis: 500,
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
app.get('/api/get_all_not_suspended', function(request, response) {
    pool.connect((err, db, done) => {
        console.log(request);
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM get_all_not_suspended()', (err, res) => {
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
//get all suspended employees
app.get('/api/get_all_suspended', function(request, response) {
    pool.connect((err, db, done) => {
        console.log(request);
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM get_all_suspended()', (err, res) => {
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
//  The get application api
app.post('/api/get_employee_applications', function(request, response) {
    var eid = request.body.eid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM get_employee_applications($1)', [eid], (err, res) => {
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
//  The get managed employees api
app.post('/api/manager_employees', function(request, response) {
    var mid = request.body.mid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM manager_employees($1)', [mid], (err, res) => {
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
//  The manager fin API
app.post('/api/manager-find', function(request, response) {
    var eid = request.body.eid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM manager_find($1)', [eid], (err, res) => {
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

//The suspend employee API
app.post('/api/suspend_employee', function(request, response) {
    var eid = request.body.eid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM suspend_employee($1)', [eid], (err, res) => {
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

//The reinstate employee API
app.post('/api/reinstate_employee', function(request, response) {
    var eid = request.body.eid;
	var accessLevel = request.body.accessLevel;
	var tempPass = request.body.tempPass;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM reinstate_employee($1, $2, $3)', [eid, accessLevel, tempPass], (err, res) => {
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

//The request app API
app.post('/api/request_app', function(request, response) {
    var eid = request.body.eid;
	var mid = request.body.mid;
	var aid = request.body.aid;
	var date = request.body.date;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM request_app($1, $2, $3, $4)', [eid, mid, aid, date], (err, res) => {
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

//The edit password API
app.post('/api/edit_password', function(request, response) {
    var eid = request.body.eid;
	var pass= request.body.pass;
	var date= request.body.date;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM edit_password($1, $2, $3)', [eid, pass, date], (err, res) => {
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


//The new emp password API
app.post('/api/add_ssid', function(request, response) {
    var eid = request.body.eid;
	var pass= request.body.pass;
	var pass2= request.body.oldPass;
	var ssid= request.body.ssid;
	var date= request.body.date;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM add_ssid($1, $2, $3, $4, $5)', [ssid, eid, pass, pass2, date], (err, res) => {
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
//The get availible applications
app.post('/api/get_possible_applications', function(request, response) {
    var eid = request.body.eid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT appname, aid FROM applications WHERE aid NOT IN(select distinct aid from permissions where eid =$1)', [eid], (err, res) => {
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

//The get requests
app.post('/api/get_requests', function(request, response) {
    var mid = request.body.eid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM get_requests($1)', [mid], (err, res) => {
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
//The approve request
app.post('/api/approve_request', function(request, response) {
    var rid = request.body.rid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM approve_request($1)', [rid], (err, res) => {
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
//The deny request
app.post('/api/deny_request', function(request, response) {
    var rid = request.body.rid;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM deny_request($1)', [rid], (err, res) => {
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
    var eid = request.body.eid;
    var mid = request.body.mid;
    var first = request.body.first;
    var last = request.body.last;
    var phone = request.body.phone;
    var address = request.body.address;
    var title = request.body.title;
    var dob = request.body.dob;
    var roleId = request.body.roleId;
    var city = request.body.city;
    var organization = request.body.organization;
    var email = request.body.email;
    var location = request.body.location;
    var description = request.body.description;
    var pic =request.body.pic;
    var accessLevel = request.body.accessLevel;
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

//The edit employee API
app.post('/api/edit_employee', function(request, response) {
    var eid = request.body.eid;
    var first = request.body.first;
    var last = request.body.last;
    var phone = request.body.phone;
    var address = request.body.address;
    var title = request.body.title;
    var dob = request.body.dob;
    var roleId = request.body.roleId;
    var city = request.body.city;
    var organization = request.body.organization;
    var email = request.body.email;
    var location = request.body.location;
    var description = request.body.description;
    var pic =request.body.pic;
    var accessLevel = request.body.accessLevel;
    pool.connect((err, db, done) => {
        if(err) {
            return response.status(400).send(err);
        } else {
            db.query('SELECT * FROM edit_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
                [eid, first, last, phone, address, title, dob, roleId, city, organization, email, location, description, pic, accessLevel], (err, res) => {
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
app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));
//app.listen(PORT, () => console.log('Listening on port ' + PORT));