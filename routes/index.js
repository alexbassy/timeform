const express = require('express')
const router = express.Router()
const { Rule } = require('../services/db')

const { encrypt, matches } = require('../lib/encrypt')

router.get('/', async (req, res, next) => {
  res.render('index', {
    title: 'Timeform',
  })
})

router.get('/oauth-url', (req, res) => {
  const TF_BASE_URL = 'https://api.typeform.com'
  const { TF_CLIENT_SECRET, BASE_URL } = process.env

  const callbackURL = `${BASE_URL}/oauth-callback`
  const scopes = ['forms:read', 'forms:write'].join(' ')
  return res.send(`${TF_BASE_URL}/oauth/authorize?client_id=${TF_CLIENT_SECRET}&redirect_uri=${callbackURL}&scope=${scopes}`)
})

router.get('/oauth-callback', (req, res) => {
  res.render('index')
})

module.exports = router
