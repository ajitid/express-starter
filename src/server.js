const path = require('path')
const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const Youch = require('youch')
const youchTerminal = require('youch-terminal')

if (process.env.NODE_ENV !== 'production') {
  const dotenvResult = require('dotenv').config({ path: path.join(path.dirname(__dirname), '.env') })
  if (dotenvResult.error) {
    throw dotenvResult.error
  }
}
const PORT = parseInt(process.env.PORT)

const app = express()

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEYS],
    maxAge: 15 * 24 * 60 * 60 * 1000
  })
)

// FIXME
require('./db')

app.use(passport.initialize())
app.use(passport.session())
require('./handlers/passport')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

module.exports = app

// added fn() below to check youch, remove it
app.get('/', (req, res) => res.render('index')) // TODO comment this out on adding index.pug
// FIXME
require('./routes')

app.use(express.static(path.join(path.dirname(__dirname), 'public')))

app.use(function (req, res, next) {
  return res.status(404).render('notFound', { pageTitle: 'Not Found' })
})

// app.use(errorReporter())
// youch for error handling
app.use((err, req, res, next) => {
  if (err && process.env.NODE_ENV !== 'production' && !res.headersSent) {
    const youch = new Youch(err, req)

    youch.toJSON().then(output => console.log(youchTerminal(output)))

    return youch
      .toHTML()
      .then(html => (
        res
          .status(500)
          .set('Content-Type', 'text/html')
          .send(html)
      ))
  }
  next(err)
})

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

server.on('error', err => {
  if (err.syscall !== 'listen') throw err
  switch (err.code) {
    case 'EACCES':
      console.error('elevated privileges are required')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`port ${PORT} is already in use`)
      process.exit(1)
    default:
      throw err
  }
})
