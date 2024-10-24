const mysql = require('mysql')
const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  charset: "utf8mb4",
  database: "sewa_komik",
  timezone: '+00:00'
})
conn.getConnection((err) => {
  if (err) throw err
  console.log('Connected!')
})

module.exports = conn
