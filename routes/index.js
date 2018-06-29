const express = require('express')
const { Rule } = require('../services/db')
const { TF_BASE_URL, getOauthToken } = require('../services/typeform-api')
const router = express.Router()

const { encrypt, matches } = require('../lib/encrypt')

router.get('/', async (req, res, next) => {
  res.render('index', {
    title: 'Timeform',
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
  const token = response.body.access_token
  return res.render('oauth-callback', {
    token,
    baseURL: BASE_URL
  })
})

module.exports = router
