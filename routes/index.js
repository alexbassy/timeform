const express = require('express')
const { Account } = require('../services/db')
const { TF_BASE_URL, getOauthToken, getAccountInfo } = require('../services/typeform-api')
const jwt = require('../lib/jwt')
const router = express.Router()

const { encrypt, matches } = require('../lib/encrypt')

router.get('/', async (req, res, next) => {
  res.render('index', {
    title: '⏰ Timeform'
  })
})

router.get('/oauth-url', (req, res) => {
  const { TF_CLIENT_ID, BASE_URL } = process.env
  const callbackURL = `${BASE_URL}/oauth-callback`
  const scopes = ['accounts:read', 'forms:read', 'forms:write'].join('+')
  return res.send(`${TF_BASE_URL}/oauth/authorize?client_id=${TF_CLIENT_ID}&scope=${scopes}&redirect_uri=${callbackURL}`)
})

router.get('/oauth-callback', async (req, res) => {
  const { BASE_URL } = process.env
  const code = req.query.code
  const response = await getOauthToken(code)
  const token = response.access_token

  const typeformAccount = await getAccountInfo({ token })
  const email = typeformAccount.email

  const account = await Account.findOneAndUpdate({ email: encrypt(email) }, { token }, {
    lean: true,
    new: true,
    upsert: true,
    fields: '_id email token'
  }).exec()

  const webToken = jwt.create(account)

  return res.render('oauth-callback', {
    token: webToken,
    baseURL: BASE_URL
  })
})

router.get('/typeform-account', async (req, res) => {
  console.log(`req.user:`, req.user)
  try {
    const account = await getAccountInfo({ token: req.user.token })
    res.json({
      account,
      encryptedEmail: encrypt(account.email)
    })
  } catch (e) {
    console.log(e)
    res.json({
      error: e
    })
  }
})

router.get('/schedules', async (req, res) => {

})

module.exports = router
