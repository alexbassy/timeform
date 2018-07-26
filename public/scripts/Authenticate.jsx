import React from 'react'
import PropTypes from 'prop-types'
import * as api from './api-lib'
import { openOAuthWindow } from './api-lib'
import * as dom from './dom-lib'
import LoadingButton from './LoadingButton'

class Authenticate extends React.Component {
  constructor (props) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.state = {
      isLoading: false
    }
  }

  async handleButtonClick () {
    if (this.state.isLoading) {
      return false
    }

    this.setState({ isLoading: true })

    const token = await openOAuthWindow()

    if (token) {
      this.setState({ isLoading: false })
      this.props.onComplete()
    }
  }

  render () {
    return (
      <div>
        <h3 className='step-title'>
          🙋‍♀️Login to your account to select a form
        </h3>
        <div className='step-content padded'>
          <p className='step-description'>
            Your Typeform email address will be stored to identify you,
            but in encrypted form, so it cannot be read or used for marketing purposes
          </p>
          <LoadingButton
            className='btn'
            onClick={this.handleButtonClick}
            disabled={this.state.isLoading}
            isLoading={this.state.isLoading}
          >
            Connect with Typeform
          </LoadingButton>
        </div>
      </div>
    )
  }
}

export default Authenticate
