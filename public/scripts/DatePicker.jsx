import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import ReactDatePicker from 'react-datepicker'
import { Input, PlainInput } from './FormElements'

import 'react-datepicker/dist/react-datepicker.css'

export const DATE_TIME_FORMAT = 'dddd[s at] HH:mm'

class DatePickerInputComponent extends PureComponent {
  onFocus (ev) {
    return ev.target.select()
  }

  render () {
    return (
      <Input
        type='text'
        textAlign='right'
        onFocus={this.onFocus}
        onClick={this.props.onClick}
        value={this.props.value}
        readOnly
      />
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
      popperPlacement='auto'
    />
  )
}

export default DatePicker
