const mysql = require('mysql2')
const { info } = require('../helpers/styled_logs')
const { Definitions } = require('../definitions');

class DataBase extends Definitions {
  constructor() {
    super()
    info('\n CONNECTED TO DATABASE ')
  }

  DATABASE_URL = process.env.DATABASE_URL
  CONNECTION = mysql.createConnection(this.DATABASE_URL).promise()

  getUsers() { return this.CONNECTION.query('SELECT * FROM Users;') }

  insert(tableName) {
    return (columns, values) => this.CONNECTION.query(`INSERT INTO ${tableName} (${columns}) VALUES (${values});`)
  }

  insertOperation(values) {
    const query = this.insert('Operations')
    const columns = ['value', 'tickers', 'information', 'userId'];
    return query(columns, values)
  }
}

module.exports = { DataBase }
