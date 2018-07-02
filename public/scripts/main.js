import React from 'react'
import ReactDOM from 'react-dom'
import * as dom from './dom-lib.js'
import * as api from './api-lib.js'
import * as actions from './actions.js'
import Scheduler from './Scheduler.jsx'

const hasToken = api.isAuthenticated()

const authButton = document.querySelector('.js-authenticate-btn')
const steps = document.querySelectorAll('.step')

if (!hasToken) {
  authButton.addEventListener('click', actions.onAuthButtonClick)
} else {
  dom.setStepState(steps[0], 'completed')
  dom.setStepState(steps[1], 'active')

  ReactDOM.render(
    <Scheduler />,
    document.querySelector('.js-scheduler')
  )
}
