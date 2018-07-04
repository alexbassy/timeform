const mongoose = require('mongoose')
const { rule, account, job } = require('./schemas')

if (!process.env.MONGODB_URI) {
  throw new Error('App started without `MONGODB_URI` present')
}

const connection = mongoose.connect(process.env.MONGODB_URI)

const Account = mongoose.model('Account', account)
const Rule = mongoose.model('Rule', rule)
const Job = mongoose.model('Job', job)

module.exports = {
  Account,
  Rule,
  Job
}
