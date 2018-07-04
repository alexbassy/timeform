const { Schema } = require('mongoose')
const { encrypt } = require('../lib/encrypt')

const account = new Schema({
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

account.pre('save', function (next) {
  if (!this.isModified('email')) return next()
  const isAlreadyHashed = this.email.indexOf('@') === -1
  if (!isAlreadyHashed) {
    this.email = encrypt(this.email)
  }
  next()
})

const rule = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  formId: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  },
  recurring: {
    type: String,
    enum: ['weekly'],
    required: true,
    default: 'weekly'
  },
  condition: {
    type: String,
    enum: ['public', 'private'],
    required: true
  },
  begin: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
})

// A routine task e.g. close on Fridays at 10:00, open on Mondays at 16:00
// would look like this:
//
// new Rule({
//  condition: 'private',
//  recurring: 'weekly',
//  condition: 'private',
//  begin: new Date(2018, 6, 6, 10, 0),
//  end: new Date(2018, 6, 9, 16, 0)
// })
//
// The begin and end date are ignored, we just use it to get the day of the
// week and the hour, given we know that it's recurring weekly.

const job = new Schema({
  ruleId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  eventTime: {
    type: Date,
    required: true
  }
})

module.exports = {
  rule,
  account,
  job
}
