import React, { Component } from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import DatePicker, { DATE_TIME_FORMAT } from './DatePicker'
import { saveRule } from './api-lib'


const FormGroupWrap = styled('div')`
  margin-bottom: 16px;
`

const Label = styled('label')`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
`

const ScheduleView = styled('div')`
  flex: 1;
  padding: 0 16px;
`

const FormGroup = ({ title, description, children }) => {
  return (
    <FormGroupWrap>
      {title ? <Label>{title}</Label> : null}
      {description ? <Label>{description}</Label> : null}
      {children}
    </FormGroupWrap>
  )
}

class Scheduler extends Component {
  constructor (props) {
    super(props)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      startDate: moment(),
      endDate: moment().add(1, 'day'),
      condition: null,
      frequency: null
    }
  }

  componentWillMount () {
    const form = this.props.form

    if (!form || !form.rule) {
      return
    }

    this.setState({
      startDate: moment(form.rule.begin),
      endDate: form.rule.end ? moment(form.rule.end) : moment().add(1, 'day'),
      condition: form.rule.condition,
      frequency: form.rule.recurring
    })
  }

  handleStartDateChange (m) {
    this.setState({ startDate: m })
  }

  handleEndDateChange (m) {
    this.setState({ endDate: m })
  }

  changeCondition (ev) {
    this.setState({ condition: ev.target.value })
  }

  changeFrequency (ev) {
    this.setState({ frequency: ev.target.value })
  }

  async handleSubmit (ev) {
    ev.preventDefault()
    const body = {
      condition: this.state.condition,
      frequency: this.state.frequency,
      begin: this.state.startDate.toDate(),
      end: this.state.endDate.toDate()
    }
    const res = await saveRule(this.props.form.id, body)
    console.log(res)
  }

  render () {
    const { form } = this.props

    if (!form) {
      return <ScheduleView />
    }

    return (
      <ScheduleView>
        <form onSubmit={this.handleSubmit}>
          <h3>{form.title}</h3>
          <FormGroup title='Condition'>
            <select
              name='condition'
              onChange={this.changeCondition}
              defaultValue={form.rule.condition}
            >
              <option value='private'>Make private</option>
              <option value='public'>Make public</option>
            </select>
          </FormGroup>
          <FormGroup title='Frequency'>
            <select
              name='recurring'
              disabled
              defaultValue={form.rule.frequency}
              onChange={this.changeFrequency}
            >
              <option value='weekly'>Weekly</option>
            </select>
          </FormGroup>
          <FormGroup title='Start time'>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
          </FormGroup>
          <FormGroup title='End time'>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
            />
          </FormGroup>
          <FormGroup title='Preview'>
            <strong>{form.title}</strong> will be set
            to <strong>{this.state.condition}</strong> every <strong>{this.state.startDate.format(DATE_TIME_FORMAT)}</strong> and
            made <strong>{this.state.condition === 'public' ? 'private' : 'public'}</strong> on <strong>{this.state.endDate.format(DATE_TIME_FORMAT)}</strong>
          </FormGroup>
          <button type='submit'>Save</button>
        </form>
      </ScheduleView>
    )
  }
}

export default Scheduler
