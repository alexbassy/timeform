let crypto

try {
  crypto = require('crypto')
} catch (err) {
  console.log('crypto support is disabled!')
}

const encrypt = str => {
  const hash = crypto.createHmac('sha256', process.env.SECRET).update(str).digest('hex')
  return hash
}

const matches = (str, comparison) => {
  const hash = encrypt(str)
  return hash === comparison
}

module.exports = {
  encrypt,
  matches
}
