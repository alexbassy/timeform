const express = require('express')
const { Account } = require('../services/db')
const { TF_BASE_URL, getForms, getForm, changeFormPublicState } = require('../services/typeform-api')
const jwt = require('../lib/jwt')
const router = express.Router()

router.get('/', async (req, res) => {
  const response = await getForms({ token: req.user.token })

  const formsWithFlattenedFields = response.items.map(form => ({
    id: form.id,
    title: form.title,
    lastUpdated: form.last_updated_at,
    isPublic: form.settings.is_public,
    isTrial: form.settings.is_trial,
    url: form.self.href
  }))

  return res.json({
    count: response.total_items,
    pages: response.page_count,
    items: formsWithFlattenedFields
  })
})

router.get('/:id', async (req, res) => {
  const form = await getForm(req.params.id, { token: req.user.token })
  return res.json(form)
})


module.exports = router
