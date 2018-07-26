import React, { Component } from 'react'
import * as api from './api-lib'
import Authenticate from './Authenticate'
import Scheduler from './Scheduler'
import Forms from './Forms'

class App extends Component {
  constructor (props) {
    super(props)
    this.onFormSelect = this.onFormSelect.bind(this)
    this.state = {
      selectedForm: null
    }
  }

  componentWillMount () {
    this.getAuthState()
  }

  getAuthState () {
    this.setState({
      isAuthenticated: api.isAuthenticated()
    })
  }

  onFormSelect (form) {
    this.setState({ selectedForm: form })
  }

  render () {
    return (
      <div className='container page-content'>
        <section className='step step-1'>
          <header className='header'>
            <h1 className='title'>
              ⏰ Timeform
            </h1>
            <div className='subtitle'>
              Automatically make your forms private, when you decide
            </div>
          </header>
          <Authenticate
            onComplete={this.getAuthState}
            isAuthenticated={this.state.isAuthenticated}
          />
        </section>
        {this.state.isAuthenticated
          ?
          <section className='step step-2'>
            <h3 className='step-title'>
              🗓 Manage schedules
            </h3>
            <div className='step-content'>
              <Forms
                onSelect={this.onFormSelect}
                selectedForm={this.state.selectedForm}
              />
            </div>
          </section>
          : null}
        {this.state.selectedForm
          ? <Scheduler form={this.state.selectedForm} />
          : null}
      </div>
    )
  }
}

App.propTypes = {}

export default App
