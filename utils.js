const bcrypt = require('bcryptjs');
const isEmpty = require('validator/lib/isEmpty')

async function hashPassword (password, salt) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}

async function makeSalt(saltRounds=10) {
  const salt = await new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) reject(err)
      resolve(salt)
    });
  })

  return salt
}

function oppositeBoolean(fn) {
  return function(...args) {
    return !fn(...args);
  }
}

const isNotEmpty = oppositeBoolean(isEmpty);

module.exports = {
  hashPassword,
  makeSalt,
  isNotEmpty,
}
