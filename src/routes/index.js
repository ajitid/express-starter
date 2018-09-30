const app = require('../server')
const accountRoute = require('./account')

app.use('/account', accountRoute)
