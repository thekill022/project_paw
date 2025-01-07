const db = require('../infrastructure/database/connection');
const responsAPI = require('../infrastructure/reponse');

exports.getAllproduct = (req, res) => {
    const sql = 'SELECT * FROM product'
    db.query(sql, (err, result) => {
        if (err) {
            return responsAPI(500,'No data found','Kegagalan menyambungkan ke Datbase',res)
        }else {
            if (result.length==0){
                return responsAPI(404,'No data found','Data kosong',res)
            }else {
                return responsAPI(200,result,'Berhasil mendapatkan semua produk',res)
            }
        }
    })
}

exports.getProductByid = (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM product WHERE id_product =?'
    db.query(sql, [id], (err, result) => {
        if (err) {
            return responsAPI(500,'No data found','Kegagalan menyambungkan ke Datbase',res)
        }else {
            if (result.length==0){
                return responsAPI(404,'No data found','Data produk dengan ID '+id+' tidak ditemukan',res)
            }else {
                return responsAPI(200,result,'Berhasil mendapatkan data produk '+id,res)
            }
        }
    })
}

exports.createTransaksi = (req, res) => {
    const {metode, idkaryawan} = req.body
    const sql = 'INSERT INTO transaksi (metodeBayar, idKaryawan) VALUES (?,?)'
    db.query(sql, [metode, idkaryawan], (err, result) => {
        if (err) {
            return responsAPI(500,'Failed to create transaksi','Kegagalan membuat transaksi',res)
        }else {
            return responsAPI(201,result,'Berhasil membuat transaksi',res)
        }
    }) 
}

exports.createListitem = (req,res) =>{
    const {idtransaksi,idproduk,jumlah} = req.body
    const sql = 'INSERT INTO list_item (idTransaksi, idProduk, jumlah) VALUES (?,?,?)'
    db.query(sql, [idtransaksi,idproduk,jumlah], (err, result) => {
        if (err) {
            return responsAPI(500,'Failed to create list item','Kegagalan membuat list item',res)
        }else {
            return responsAPI(201,result,'Berhasil membuat list item',res)
        }
    })
}