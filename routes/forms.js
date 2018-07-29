const http = require('http')
const express = require('express')
const { Account, Rule } = require('../services/db')
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

  const formIDs = formsWithFlattenedFields.map(form => form.id)

  const rules = await Rule.find({ formId: { $in: formIDs } })

  const formsWithRules = formsWithFlattenedFields.map(form => {
    const matching = rules.find(rule => rule.formId === form.id)
    return Object.assign({}, form, { rule: matching || null })
  })

  return res.json({
    count: response.total_items,
    pages: response.page_count,
    items: formsWithRules
  })
})

router.get('/:id', async (req, res) => {
  const form = await getForm(req.params.id, { token: req.user.token })
  return res.json(form)
})

router.post('/rule/:id', async (req, res) => {
  const accountId = req.user._id
  const { frequency, condition, begin, end, enabled } = req.body
  try {
    const rule = await Rule.findOneAndUpdate({
      formId: req.params.id,
    }, {
      formId: req.params.id,
      accountId: accountId,
      enabled: enabled,
      condition: condition,
      recurring: frequency,
      begin: begin,
      end: end
    }, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      lean: true
    })
    return res.status(201).json(rule)
  } catch (err) {
    return res.status(400).json(err)
  }
})

module.exports = router
