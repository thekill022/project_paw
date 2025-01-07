const express = require('express');
const bodyParser = require('body-parser');
const admincontroller = require('../controller/admincontroller');
const auth = require('../middleware/auth')

const admin = express.Router();
admin.use(bodyParser.json());

admin.use(auth.isAuthicated);
admin.use(auth.validateAdmin);

//Karyawan
admin.get('/karyawan',admincontroller.getAllkaryawan)
admin.get('/karyawan:nama',admincontroller.getKaryawanBynama)
admin.post('/karyawan',admincontroller.createKaryawan)
admin.put('/karyawan:nama',admincontroller.updateKaryawan)
admin.delete('/karyawan:nama',admincontroller.deleteKaryawan)

//Product
admin.get('/product', admincontroller.getAllproduct)
admin.get('/product:nama',admincontroller.getProductBynama)
admin.post('/product',admincontroller.createProduct)
admin.put('/product:id',admincontroller.updateProduct)
admin.delete('/product:id',admincontroller.deleteProduct)

//Transaksi
admin.get('/transaksi',admincontroller.getAlltransaksi)
admin.get('/transaksi:namakaryawan',admincontroller.getTransaksiBynamaKaryawan)
admin.get('/transaksi:metodebayar',admincontroller.getTransaksiBymetodeBayar)
admin.get('/transaksi:tanggal',admincontroller.getTransaksiBytanggal)
admin.delete('transaksi:id',admincontroller.deleteTransaksi)

module.exports = admin;