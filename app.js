const express = require('express')
const app = express()
const conn = require('./config/db')

app.use(express.json())
 
app.get('/get-komik', function (req, res) {
  const queryStr = 'SELECT * FROM komik WHERE deleted_at IS NULL';
  conn.query(queryStr, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menampilkan data",
        "data" : results
      });
    }
  })
})

app.get('/get-komik-by-id', function (req, res) {
  const param = req.query;
  const id = param.id;
  const queryStr = 'SELECT * FROM komik WHERE id = ? AND deleted_at IS NULL';
  const values = [id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menampilkan data",
        "data" : results
      });
    }
  })
})



app.post('/store-komik', function (req, res) {
  const param = req.body;
  const judul = param.judul;
  const pengarang = param.pengarang;
  const queryStr = 'INSERT INTO komik (judul, pengarang) VALUES (?, ?)';
  const values = [judul, pengarang];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menyimpan data",
        "data" : null
      });
    }
  })
})

app.post('/update-komik', function (req, res) {
  const param = req.body;
  const id = param.id;
  const judul = param.judul;
  const pengarang = param.pengarang;
  const queryStr = 'UPDATE komik SET judul = ?, pengarang = ? WHERE id = ? AND deleted_at IS NULL';
  const values = [judul, pengarang, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses mengubah data",
        "data" : null
      });
    }
  })
})

app.post('/delete-komik', function (req, res) {
  const param = req.body;
  const id = param.id;
  const queryStr = 'UPDATE komik SET deleted_at = ? WHERE id = ?';
  const now = new Date();
  const values = [now, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menghapus data",
        "data" : null
      });
    }
  })
})
 
app.listen(3000)