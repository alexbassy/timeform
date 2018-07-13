import * as dom from './dom-lib.js'
import * as api from './api-lib.js'
import * as actions from './actions.js'

import 'normalize.css'
import '../styles/font.css'
import '../styles/style.css'

const hasToken = api.isAuthenticated()

const authButton = document.querySelector('.js-authenticate-btn')

if (!hasToken) {
  authButton.addEventListener('click', actions.onAuthButtonClick)
} else {
  dom.setStepState(0, 'completed')
  dom.setStepState(1, 'active')
}
