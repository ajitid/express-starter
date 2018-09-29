const { Router } = require('express')
const passport = require('passport')

const router = Router()
const { makeSalt, hashPassword } = require('../utils')

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

router.get('/logged-in', (req, res) => {
  console.log(req.isAuthenticated())
  if (req.user) { return res.send('logged in') }
  return res.send('not logged in')
})

router.post('/logout', async (req, res) => {
  req.logout()
  return res.send('logged out')
})

router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body
  const passwordSalt = await makeSalt()
  const hashedPassword = await hashPassword(password, passwordSalt)
  User.create({
    email,
    name,
    password: hashedPassword,
    'password_salt': passwordSalt
  })
    .then(user => {
      return res.send('user created')
    })
    .catch(Sequelize.ValidationError, err => {
      // FIXME convert it into actual HTTP error codes
      return res.send("didn't created, same email found")
    })
    // FIXME convert it into async await / Promise based
  // put all this logic in beforeCreate hook
})

module.exports = router
