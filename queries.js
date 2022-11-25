// const Pool  = require("pg").Pool;
var express = require("express");
const Router = express.Router();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: '0000',
    port:5432,
})


Router
module.exports = Router;