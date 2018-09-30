if (process.env.NODE_ENV !== 'production') {
  const dotenvResult = require('dotenv').config()
  if (dotenvResult.error) {
    throw dotenvResult.error
  }
}

// TypeORM config
module.exports = {
  'type': process.env.DB_TYPE,
  'url': process.env.DB_URI,
  'logging': false,
  'entities': [
    'src/db/entities/**/*.js'
  ],
  'migrations': [
    'src/db/migrations/**/*.ts'
  ],
  'subscribers': [
    'src/db/subscribers/**/*.js'
  ],
  'cli': {
    'entitiesDir': 'src/db/entities',
    'migrationsDir': 'src/db/migrations',
    'subscribersDir': 'src/db/subscribers'
  }
}
