const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool
const db = require('./queries');

var PORT = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: '0000',
    port:5432,
})

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })

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

// app.listen(5000, console.log('app'))

https.createServer(app).listen(PORT);