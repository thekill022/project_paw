const express = require('express');
const bodyParser = require('body-parser');
const user = require('./user');
const pelanggan = require('./pelanggan');
const admin = require('./admin');
const karyawan = require('./karyawan');
const authMiddleware = require('../middleware/auth');
const app = express.Router()

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

app.use('/login',authMiddleware.isAuthicated);
app.use('/user',user)
app.use('/pelanggan',pelanggan);
app.use('/admin',admin);
app.use('/karyawan',karyawan);

module.exports = app;