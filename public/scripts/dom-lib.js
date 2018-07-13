import React from 'react'
import ReactDOM from 'react-dom'
import Scheduler from './Scheduler.jsx'
import Spin from 'spin'

const steps = document.querySelectorAll('.step')

export function hideElement (elem) {
  if (!elem) return
  elem.setAttribute('hidden', true)
  elem.setAttribute('aria-hidden', true)
}

export function showElement (elem) {
  if (!elem) return
  elem.removeAttribute('hidden')
  elem.removeAttribute('aria-hidden')
}

export function setStepState (step, state) {
  const stepElem = steps[step]
  switch (state) {
    case 'active':
      stepElem.classList.remove('disabled', 'completed')
      showElement(stepElem.querySelector('.step-content'))
      if (step === 1) {
        ReactDOM.render(
          <Scheduler />,
          document.querySelector('.js-scheduler')
        )
      }
      return

    case 'disabled':
      stepElem.classList.add('disabled')
      hideElement(stepElem.querySelector('.step-content'))
      return

    case 'completed':
      stepElem.classList.add('completed')
      hideElement(stepElem.querySelector('.step-content'))
      return
  }
}

export function insertSpinner (target, options) {
  const opts = Object.assign({
    lines: 9,
    length: 5,
    width: 3,
    radius: 6,
    scale: 0.85,
    corners: 1,
    color: '#ffffff',
    fadeColor: 'transparent',
    speed: 1.5,
    animation: 'spinner-line-fade-default',
    className: 'spinner',
    shadow: '',
    position: 'relative'
  }, options)

  return new Spin(opts).spin(target)
}

export function freezeElementWidthAndHeight (elem) {
  const width = elem.offsetWidth
  const height = elem.offsetHeight
  elem.style.width = width + 'px'
  elem.style.height = height + 'px'
}

export function setTextContent (elem, content) {
  elem.textContent = content
}
