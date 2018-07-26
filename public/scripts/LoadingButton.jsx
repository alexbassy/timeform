import React from 'react'
import Spin from 'spin'

class LoadingButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.elem = React.createRef()
  }

  componentDidMount () {
    const opts = Object.assign({
      lines: 9,
      length: 4,
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
    }, this.props.options)

    this.spinner = new Spin(opts)
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.isLoading && this.props.isLoading) {
      this.spinner.spin(this.elem.current)
    } else if (prevProps.isLoading && !this.props.isLoading) {
      this.spinner.stop()
    }
  }

  componentWillUnmount () {
    if (this.spinner) {
      this.spinner.stop()
    }
  }

  render () {
    return (
      <button {...this.props}>
        {this.props.isLoading
          ? <div className='spinner' ref={this.elem} />
          : this.props.children}
      </button>
    )
  }
}

LoadingButton.defaultProps = {
  options: {}
}

export default LoadingButton
