const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admincontroller = require('../controller/admincontroller');
const auth = require('../middleware/auth')

const admin = express.Router();
admin.use(bodyParser.json());

admin.use(auth.validateAdmin);


// frontend
admin.get('/dashboard', (req, res) => {
    const user = req.session.user;
    res.render('admin/dashboardAdmin', {user})
})

admin.get('/riwayat', (req, res) => {
    const user = req.session.user;
    res.render('admin/riwayat', {user})
})

//Karyawan
admin.get('/karyawan',admincontroller.getAllkaryawan)
admin.get('/karyawan:nama',admincontroller.getKaryawanBynama)
admin.post('/karyawan',admincontroller.createKaryawan)
admin.put('/karyawan:nama',admincontroller.updateKaryawan)
admin.delete('/karyawan:nama',admincontroller.deleteKaryawan)

//Product
admin.get('/product', admincontroller.getAllproduct)
admin.get('/product/:nama',admincontroller.getProductBynama)
admin.post('/product',admincontroller.createProduct)
admin.put('/product/:id',admincontroller.updateProduct)
admin.delete('/product/:id',admincontroller.deleteProduct)

//Transaksi
admin.delete('/transaksi/:id',admincontroller.deleteTransaksi)
admin.get('/transaksi',admincontroller.riwayatTransaksi)

module.exports = admin;