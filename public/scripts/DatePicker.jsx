import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export const DATE_TIME_FORMAT = 'dddd[s at] HH:mm'

const Icon = styled('img')`
  width: 32px;
  height: 32px;
  vertical-align: middle;
`

const DatePickerInput = styled('input')`
  
`

class DatePickerInputComponent extends PureComponent {
  onFocus (ev) {
    return ev.target.select()
  }

  render () {
    console.log(this.props.value)
    return (
      <div>
        <Icon src={require('../images/cal.svg')} alt='' />
        <DatePickerInput
          type='text'
          onFocus={this.onFocus}
          onClick={this.props.onClick}
          value={this.props.value}
          readOnly
        />
      </div>
    )
  }
}

const DatePicker = (props) => {
  return (
    <ReactDatePicker
      customInput={<DatePickerInputComponent />}
      selected={props.selected}
      onChange={props.onChange}
      showTimeSelect
      locale='en-gb'
      timeFormat='HH:mm'
      timeIntervals={10}
      dateFormat={DATE_TIME_FORMAT}
      timeCaption='time'
    />
  )
}

export default DatePicker
