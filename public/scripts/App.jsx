import React, { Component } from 'react'
import * as api from './api-lib'
import Authenticate from './Authenticate'
import Forms from './Forms'

class App extends Component {
  componentWillMount () {
    this.getAuthState()
  }

  getAuthState () {
    this.setState({
      isAuthenticated: api.isAuthenticated()
    })
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
          <Authenticate onComplete={this.getAuthState} />
        </section>
        <section className='step step-2 disabled'>
          <h3 className='step-title'>
            🗓 Manage schedules
          </h3>
          <div className='step-content'>
            {this.state.isAuthenticated ? <Forms /> : null}
          </div>
        </section>
      </div>
    )
  }
}

App.propTypes = {}

export default App
