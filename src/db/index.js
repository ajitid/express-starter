const { createConnection } = require('typeorm')

const entities = require('./entities')

// FIXME needs await, take `type` from .env

createConnection({
  type: 'postgres',
  url: process.env.DB_URI,
  entities
}).then(connection => {
  if (connection.isConnected) {
    console.log('connected to database')

    module.exports = {
      dbConn: connection,
      dbMgr: connection.manager,
      dbSave: connection.manager.save
    }
  }
}).catch(err => {
  console.log("couldn't connect to database")
  console.log(err)
  process.exit(2)
})
