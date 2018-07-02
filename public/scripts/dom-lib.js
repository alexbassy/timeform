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
  switch (state) {
    case 'active':
      step.classList.remove('disabled', 'completed')
      showElement(step.querySelector('.step-content'))
      return

    case 'disabled':
      step.classList.add('disabled')
      hideElement(step.querySelector('.step-content'))
      return

    case 'completed':
      step.classList.add('completed')
      hideElement(step.querySelector('.step-content'))
      return
  }
}

export function insertSpinner (target) {
  const opts = {
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
  }

  return new Spinner(opts).spin(target)
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
