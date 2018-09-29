const app = require('../server')
const authRoute = require('./user')

app.use('/user', authRoute)
