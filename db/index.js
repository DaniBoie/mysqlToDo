const mysql = require('mysql2')

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '-Fisher3385-',
  database: 'todo_db'
})


