const mysql = require('mysql2')

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '-Fisher3385-',
  database: 'todo_db'
})

module.exports = mysql.createConnection(process.env.JAWSDB_URL || 'mysql://root:-Fisher3385-@localhost/todo_db')

