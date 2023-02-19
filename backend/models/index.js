const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.PGDATABASE
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}