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

module.exports = {
  TF_BASE_URL,
  getOauthToken,
  getAccountInfo
}
