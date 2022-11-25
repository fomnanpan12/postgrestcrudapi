const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool
const db = require('./queries');
const dotenv = require("dotenv");
var methodOverride = require('method-override')
dotenv.config()

// var PORT = 5000;
var PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(methodOverride());

app.get('/', (req, res) => {
    // res.json({ info: 'Node.js, Express, and Postgres API' })
    res.json({'GET_USERS': '/users', 'POST_USERS': '/add', 'GET_USER_BY_ID': '/users/:id', 'PUT/UPDATE_USER': '/users/id'})

});

app.get('/users', async(req, res) => {
    await pool.query('SELECT * FROM USERS ORDER BY id ASC', (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows)
    })
})

app.post('/add', async(req, res) => {
    const { name, email } = req.body
    console.log(name, email);
    
    await pool.query('INSERT INTO USERS (name, email) VALUES ($1, $2) RETURNING *', [name, email], (err, results) =>{
        if (err) {
            throw err;
        }
        res.status(201).json(results.rows)
    }
    )
})

app.get('/users/:id', async(req, res) => {
    const id = req.params.id;

    await pool.query('SELECT * FROM USERS WHERE id=$1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows)
    })
})

app.put('/users/id', async(req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    console.log(id, name, email);

     pool.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', [name, email, id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(201).send(`your id ${id} has successfully been updated with ${result.rows}`)
    })
})

app.listen(PORT, console.log('app'))
