import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { openOAuthWindow } from './api-lib'
import LoadingButton from './LoadingButton'

const Link = styled('button')`
  display: inline;
  -webkit-appearance: none;
  color: ${props => props.red ? '#dc0d0d' : '#4399fa'};
  font-weight: bold;
  text-decoration: underline;
  padding: 0;
  font-size: 16px;
  line-height: 32px;
  text-align: left;
  border: none;
`

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
    if (this.props.isAuthenticated) {
      return (
        <div>
          <h3 className='step-title'>
            You're logged in
          </h3>
          <div className='step-content padded'>
            <p className='step-description'>
              Your Typeform email address is stored to identify you,
              but in encrypted form, so it cannot be read or used for marketing purposes
            </p>
            <Link>Log out</Link>
            <Link red>Delete all my data</Link>
          </div>
        </div>
      )
    }

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
