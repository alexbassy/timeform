const API_BASE = 'https://api.typeform.com'

export function getToken () {
  return localStorage.getItem('token')
}

function fetchAuthenticated (url, options = {}) {
  const defaultHeaders = options.headers || {}
  return fetch(url, Object.assign({}, options, {
    headers: Object.assign({}, defaultHeaders, getAuthHeaders())
  }))
}

function getAuthHeaders () {
  return {
    Authorization: `bearer ${getToken()}`
  }
}

export function isAuthenticated () {
  return !!getToken()
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
      localStorage.setItem('token', token)
      resolve(token)
    })
  })
}

export async function getForms () {
  const request = fetchAuthenticated('/forms').then(res => res.json())
  return request
}
