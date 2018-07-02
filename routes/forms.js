const express = require('express')
const { Account } = require('../services/db')
const { TF_BASE_URL, getForms, getForm, changeFormPublicState } = require('../services/typeform-api')
const jwt = require('../lib/jwt')
const router = express.Router()

router.get('/', async (req, res) => {
  const forms = await getForms({ token: req.user.token })
  return res.json(forms)
})

router.get('/:id', async (req, res) => {
  const form = await getForm(req.params.id, { token: req.user.token })
  return res.json(form)
})


module.exports = router
