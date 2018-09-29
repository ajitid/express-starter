const { Router } = require('express')
const passport = require('passport')

const User = require('../db/models/Account')
const { makeSalt, hashPassword } = require('../utils/hashing')
const { dbSave } = require('../db')

const router = Router()

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
  const user = new User(email, name, hashedPassword)
  const s = await dbSave(user)
  console.log(s)
  // await user.save()
  // return res.send('yo')
  // User.create({
  //   email,
  //   name,
  //   password: hashedPassword,
  //   'password_salt': passwordSalt
  // })
  //   .then(user => {
  //     return res.send('user created')
  //   })
  return res.send('done')
  //   .catch(Sequelize.ValidationError, err => {
  //     // FIXME convert it into actual HTTP error codes
  //     return res.send("didn't created, same email found")
  //   })
  //   // FIXME convert it into async await / Promise based
  // // put all this logic in beforeCreate hook
})

module.exports = router
