const db = require('../infrastructure/database/connection');
const responsAPI = require('../infrastructure/reponse');


exports.isAuthicated = (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }

    // Query admin
    db.query('select * from admin where username = ? and password = ?', 
        [username, password],
        (err, adminResult) => {
            if (err) {
                return responsAPI(500, 'Failed to authenticate', 'Internal Server Error', res);
            }

            if (adminResult.length > 0) {
                req.user = {
                    id: adminResult[0].idAdmin,
                    username: adminResult[0].username,
                    name: adminResult[0].namaAdmin,
                    role: 'admin'
                }
                return res.json({
                    success: true,
                    message: 'Login successful',
                    redirectUrl: '/admin',
                    user: req.user
                });
            }

            // Query karyawan jika admin tidak ditemukan
            db.query('select * from karyawan where username =? and password =?', 
                [username, password],
                (err, karyawanResult) => {
                    if (err) {
                        return responsAPI(500, 'Failed to authenticate', 'Internal Server Error', res);
                    }

                    if (karyawanResult.length > 0) {
                        req.user = {
                            id: karyawanResult[0].idKaryawan,
                            username: karyawanResult[0].username,
                            name: karyawanResult[0].namaKaryawan,
                            role: 'karyawan'
                        }
                        return res.json({
                            success: true,
                            message: 'Login successful',
                            redirectUrl: '/karyawan',
                            user: req.user
                        });
                    }

                    // Jika tidak ada user yang ditemukan
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid credentials',
                        redirectUrl: '/login'
                    });
                });
        });
}

exports.validateKaryawan = (req, res, next) => {
    if(req.user && req.user.role == 'karyawan') {
        next();
    } else {
        res.redirect('/login')
    }
}

exports.validateAdmin = (req, res, next) => {
    if(req.user && req.user.role == 'admin') {
        next();
    } else {
        res.redirect('/login')
    }
}  