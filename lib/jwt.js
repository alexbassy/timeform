const jwt = require('jsonwebtoken')

const { SECRET } = process.env

function create (payload) {
  return jwt.sign(payload, SECRET)
}

function readHeader (authHeader) {
  const token = authHeader.replace('bearer ', '')
  return read(token)
}

function read (token) {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, SECRET, (err, decoded) => {
      if (!err) {
        return resolve(decoded)
      }
      console.log(`Error decoding token:`, err.message)
      resolve(null)
    })
  })
}

module.exports = {
  create,
  readHeader,
  read
}
