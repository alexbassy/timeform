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
