import { freezeElementWidthAndHeight, insertSpinner } from './dom-lib.js'

const authButton = document.querySelector('.js-authenticate-btn')

authButton.addEventListener('click', (ev) => {
  const button = ev.target
  const { isLoading, textContent } = button.dataset

  if (!isLoading) {
    freezeElementWidthAndHeight(button)
    button.dataset.textContent = button.textContent
    button.textContent = ' '
    insertSpinner(button)
  }
})
