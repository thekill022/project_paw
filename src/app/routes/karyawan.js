const express = require('express')
const bodyParser = require('body-parser')
const karyawancontroller = require('../controller/karyawancontroller')
const auth = require('../middleware/auth');

const karyawan = express.Router()
karyawan.use(bodyParser.json())

karyawan.use(auth.isAuthicated);
karyawan.use(auth.validateKaryawan);

//produk
karyawan.get('/product',karyawancontroller.getAllproduct);
karyawan.get('/product:id',karyawancontroller.getProductByid)

//transaksi
karyawan.post('/transaksi',karyawancontroller.createTransaksi)
//List item
karyawan.post('/listitem',karyawancontroller.createListitem)

module.exports = karyawan;