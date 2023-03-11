const mysql = require('mysql2')
const { info } = require('./../helpers/styledLogs')

class DataBase {
  constructor() { info('\n CONNECTED TO DATABASE ') }

  DATABASE_URL = process.env.DATABASE_URL
  CONNECTION = mysql.createConnection(this.DATABASE_URL).promise()

  getAllUsers () {
    return this.CONNECTION.query("SELECT * FROM Users")
  }

}

module.exports = { DataBase }
