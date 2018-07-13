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
    if (matching) {
      console.log(matching)
    }
    return Object.assign({}, form, { rule: matching || {} })
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
  const { frequency, condition, begin, end } = req.body
  const rule = new Rule({
    formId: req.params.id,
    accountId: accountId,
    enabled: true,
    condition: condition,
    recurring: frequency,
    begin: begin,
    end: end
  })
  rule.save(err => {
    if (err) {
      return res.status(400).json(err)
    }
    res.status(201).json(rule)
  })
})

module.exports = router
