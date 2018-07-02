const mongoose = require('mongoose')
const connection = mongoose.connect(process.env.MONGODB_URI)
const { encrypt, matches } = require('../lib/encrypt')

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  }
})

accountSchema.pre('save', function (next) {
  if (!this.isModified('email')) return next()
  this.email = encrypt(this.email)
  next()
})

const Account = mongoose.model('Account', accountSchema)

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
  Rule
}
