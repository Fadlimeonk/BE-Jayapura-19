const express = require('express');
const app = express();
const conn = require('./db');
const port = process.env.PORT || 3000

app.use(express.json());

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
        res.status(200).json({
            "success": true,
            "message": "Sukses menampilkan data paket",
            "data": results
        })
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