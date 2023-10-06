const express = require('express');
const app = express();
const conn = require('./db');
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors({
    origin: '*',
}))

// API Menampilkan All Paket
app.get('/get-paket', function(req, res){
    const queryStr = "SELECT resi, tanggal, penerima, status FROM paket";
    conn.query(queryStr, (err, results) => {
        if (err){
            console.log(err);
            res.error(err.sqlMessage, res);
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Sukses menampilkan semua data paket",
                "data": results
            });
        }
    });
})

// API Print Paket by Resi
app.get('/get-paket-by-resi', function(req, res){
    const param = req.query;
    const resi = param.resi;

    const queryStr = "SELECT * FROM paket WHERE resi = ?";
    const values = [resi];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        }
        else{
            res.status(200).json({
            "success": true,
            "message": "Sukses menampilkan data paket",
            "data": results
            });
        }
    });
})

// API Menyimpan Paket
app.post('/store-paket', function(req, res){
    const param = req.body;
    const resi = param.resi;
    const penerima = param.penerima;
    const status = param.status;
    const now = new Date();

    const queryStr = "INSERT INTO paket (resi, tanggal, penerima, status) VALUE (?, ?, ?, ?)";
    const values = [resi, now, penerima, status];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Sukses menyimpan data",
                "data": results
            });
        }
    })
})

// API Menampilkan Komentar
app.get('/get-komen', function(req, res){
    const queryStr = "SELECT id, nama, komen, uploaded_at FROM komentar";
    conn.query(queryStr, (err, results) => {
        if (err){
            console.log(err);
            res.error(err.sqlMessage, res);
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Sukses menampilkan komentar",
                "data": results
            });
        }
    });
})

// API Menyimpan Komen
app.post('/store-komen', function(req, res){
    const param = req.body;
    const nama = param.nama
    const komen = param.komen;
    const now = new Date();

    const queryStr = "INSERT INTO komentar (nama, komen, uploaded_at) VALUE (?, ?, ?)";
    const values = [nama, komen, now];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Sukses menyimpan komentar",
                "data": results
            });
        }
    })
})

app.listen(port);