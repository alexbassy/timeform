const API_BASE = 'https://api.typeform.com'

export function hasToken () {
  return localStorage.getItem('token')
}

export function isAuthenticated () {
  return !!hasToken()
}

export function getAuthorisationURL () {
  return fetch('/oauth-url').then(res => res.text())
}

export async function openOAuthWindow () {
  return new Promise(async (resolve, reject) => {
    const oauthURL = await getAuthorisationURL()
    let oauthWindow = window.open(
      oauthURL,
      'TypeformOauthScreen',
      'scrollbars,status,width=400,height=700'
    )

    window.addEventListener('message', (message) => {
      const token = message.data
      oauthWindow.close()
      oauthWindow = null
      localStorage.setItem('typeformToken', token)
      resolve(token)
    })
  })
}
