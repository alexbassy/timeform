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
    const token = await got.post(`${TF_BASE_URL}/oauth/token`, {
      json: true,
      form: true,
      body
    })
    return token
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  TF_BASE_URL,
  getOauthToken
}
