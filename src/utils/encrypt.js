const bcrypt = require('bcryptjs')

async function hashString (string, salt) {
  const hashedString = await new Promise((resolve, reject) => {
    bcrypt.hash(string, salt, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })

  return hashedString
}

async function makeSalt (saltRounds = 10) {
  const salt = await new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) reject(err)
      resolve(salt)
    })
  })

  return salt
}

// function oppositeBoolean (fn) {
//   return function (...args) {
//     return !fn(...args)
//   }
// }

module.exports = {
  hashString,
  makeSalt
}
