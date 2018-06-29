import * as dom from './dom-lib.js'
import * as api from './api-lib.js'

const authButton = document.querySelector('.js-authenticate-btn')
const onAuthButtonClick = async ev => {
  const button = ev.target
  const { isLoading } = button.dataset

  if (isLoading) {
    return false
  }

  button.dataset.isLoading = true

  dom.freezeElementWidthAndHeight(button)
  dom.setTextContent(button, '')
  button.disabled = true
  const spinner = dom.insertSpinner(button)

  const token = await api.openOAuthWindow()

  if (token) {
    spinner.stop()
    dom.setTextContent(button, 'Done!')
    button.classList.add('')
  }
}
authButton.addEventListener('click', onAuthButtonClick)
