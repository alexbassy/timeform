const got = require('got')

const TF_BASE_URL = 'https://api.typeform.com'

async function getOauthToken (code) {
  const { TF_CLIENT_ID, TF_CLIENT_SECRET, BASE_URL} = process.env
  try {
    const body = {
      client_id: TF_CLIENT_ID,
      client_secret: TF_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/oauth-callback`,
      code: code
    }
    return await got.post(`${TF_BASE_URL}/oauth/token`, {
      json: true,
      form: true,
      body
    }).then(response => response.body)
  } catch (e) {
    console.log(e)
  }
}

async function getAccountInfo (options) {
  return await got(`${TF_BASE_URL}/me`, {
    json: true,
    headers: {
      Authorization: `bearer ${options.token}`
    }
  }).then(response => response.body)
}

async function getForms (options) {
  return await got(`${TF_BASE_URL}/forms`, {
    json: true,
    headers: {
      Authorization: `bearer ${options.token}`
    }
  }).then(response => response.body)
}

async function getForm (id, options) {
  return await got(`${TF_BASE_URL}/forms/${id}`, {
    json: true,
    headers: {
      Authorization: `bearer ${options.token}`
    }
  }).then(response => response.body)
}

async function updateForm (id, options) {
  return await got(`${TF_BASE_URL}/forms/${id}`, {
    json: true,
    headers: {
      Authorization: `bearer ${options.token}`
    }
  }).then(response => response.body)
}

async function changeFormPublicState (id, isPublic, options) {
  if (typeof isPublic === 'undefined') {
    return console.warn(`changeFormPublicState: isPublic field was omitted, will not fulfill request`)
  }

  return await got(`${TF_BASE_URL}/forms/${id}`, {
    method: 'patch',
    json: true,
    headers: {
      Authorization: `bearer ${options.token}`
    },
    body: [
      {
        op: `replace`,
        path: `/settings/is_public`,
        value: isPublic
      }
    ]
  })
}

module.exports = {
  TF_BASE_URL,
  getOauthToken,
  getAccountInfo,
  getForms,
  getForm,
  updateForm,
  changeFormPublicState
}
