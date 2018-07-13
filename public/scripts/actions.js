import * as dom from './dom-lib.js'
import { openOAuthWindow, getForms } from './api-lib.js'

export const onAuthButtonClick = async ev => {
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

  const token = await openOAuthWindow()

  if (token) {
    spinner.stop()
    dom.setStepState(0, 'completed')
    dom.setStepState(1, 'active')
  }
}
