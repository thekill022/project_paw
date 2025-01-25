const request = require('supertest');
const express = require('express');
const multer = require('multer');
const app = express();
const adminController = require('../app/controller/admincontroller');
const db = require('../app/infrastructure/database/connection');

jest.mock('../app/infrastructure/database/connection');

const upload = multer({ dest: 'uploads/' });
app.use(express.json());
app.post('/admin/product', upload.single('image'), adminController.createProduct);

describe('POST /admin/product', () => {
    it('should create a product and return 201 status', async () => {
        const mockProduct = {
            namaProduk: 'Test Product',
            kategori: 'Test Category',
            harga: 1000
        };
        const mockFile = {
            filename: 'testimage.jpg'
        };

        db.query.mockImplementation((sql, params, callback) => {
            if (sql.includes('INSERT INTO foto')) {
                callback(null, { insertId: 1 });
            } else if (sql.includes('SELECT idFoto FROM foto')) {
                callback(null, [{ idFoto: 1 }]);
            } else if (sql.includes('INSERT INTO produk')) {
                callback(null, { insertId: 1 });
            }
        });

        const response = await request(app)
            .post('/admin/product')
            .field('namaProduk', mockProduct.namaProduk)
            .field('kategori', mockProduct.kategori)
            .field('harga', mockProduct.harga)
            .attach('image', Buffer.from('test image content'), mockFile.filename);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Berhasil membuat product');
    });

    it('should return 500 if there is a database error', async () => {
        const mockProduct = {
            namaProduk: 'Test Product',
            kategori: 'Test Category',
            harga: 1000
        };
        const mockFile = {
            filename: 'testimage.jpg'
        };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        const response = await request(app)
            .post('/admin/product')
            .field('namaProduk', mockProduct.namaProduk)
            .field('kategori', mockProduct.kategori)
            .field('harga', mockProduct.harga)
            .attach('image', Buffer.from('test image content'), mockFile.filename);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Kegagalan membuat product');
    });

    it('should return an error if no file is uploaded', async () => {
        const mockProduct = {
            namaProduk: 'Test Product',
            kategori: 'Test Category',
            harga: 1000
        };

        const response = await request(app)
            .post('/admin/product')
            .field('namaProduk', mockProduct.namaProduk)
            .field('kategori', mockProduct.kategori)
            .field('harga', mockProduct.harga);

        expect(response.status).toBe(500);
        expect(response.error.text).toContain('Please upload a file');
    });
});