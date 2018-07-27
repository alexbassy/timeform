import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Input, Select } from './FormElements'

const days = moment.weekdays()

class WeekTimePicker extends Component {
  constructor (props) {
    super(props)
    this.onDayChange = this.onDayChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
  }

  onDayChange (ev) {
    const newDay = this.props.value.day(ev.target.value)
    this.props.onChange(newDay)
  }

  onTimeChange (ev) {
    const minuteAndHour = moment(ev.target.value, 'HH:mm')
    const newTime = this.props.value
      .hour(minuteAndHour.hour())
      .minute(minuteAndHour.minute())
      .second(0)
    this.props.onChange(newTime)
  }

  render () {
    return (
      <div>
        <Select
          value={this.props.value.day()}
          onChange={this.onDayChange}
        >
          <option disabled>Select...</option>
          {days.map((day, i) => <option key={day} value={i}>{day}</option>)}
        </Select>
        <Input
          type='time'
          onChange={this.onTimeChange}
          value={this.props.value.format('HH:mm')}
        />
      </div>
    )
  }
}

WeekTimePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
}

export default WeekTimePicker
