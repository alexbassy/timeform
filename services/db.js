const mongoose = require('mongoose')
const connection = mongoose.connect(process.env.MONGODB_URI)

const Account = mongoose.model('Account', new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
}))

const Rule = mongoose.model('Rule', new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId
  },
  updated: {
    type: Date,
    default: Date.now
  },
  enabled: {
    type: Boolean
  },
  ruleType: {
    type: String,
    enum: ['public', 'private'],
    required: true
  },
  begin: {
    type: Date,
    required: true
  },
  end: {
    type: Date
  }
}))

module.exports = {
  Account,
  Rule,
}
