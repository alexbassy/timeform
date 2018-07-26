import React, { Component } from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import DatePicker, { DATE_TIME_FORMAT } from './DatePicker'
import { Label, Select, Button } from './FormElements'
import { saveRule } from './api-lib'

const FormGroupWrap = styled('div')`
  display: flex;
  margin-bottom: 16px;
  align-items: baseline;
  border-bottom: 2px dotted #ddd;
`

const FormInputWrap = styled('div')`
  margin-left: auto;
`

const ScheduleView = styled('div')`
  flex: 1;
  padding: 0 16px;
`

const Preview = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 160px 24px 0;
  font-size: 22px;
  line-height: 33px;
  font-weight: 300;
  color: #666;
  height: 150px;
  
  strong {
    font-weight: 500;
    color: #333;
  }
`

const FormGroup = ({ title, description, children }) => {
  return (
    <FormGroupWrap>
      {title ? <Label>{title}</Label> : null}
      {description ? <Label>{description}</Label> : null}
      <FormInputWrap>
        {children}
      </FormInputWrap>
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
      condition: 'private',
      frequency: 'weekly'
    }
  }

  componentWillMount () {
    const form = this.props.form

    if (!form || !form.rule) {
      return
    }

    this.setState({
      startDate: moment(form.rule.begin),
      endDate: moment(form.rule.end),
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
            <Select
              name='condition'
              onChange={this.changeCondition}
              defaultValue={this.state.condition}
            >
              <option value='private'>Make private</option>
              <option value='public'>Make public</option>
            </Select>
          </FormGroup>
          <FormGroup title='Frequency'>
            <Select
              name='recurring'
              disabled
              defaultValue={this.state.frequency}
              onChange={this.changeFrequency}
            >
              <option value='weekly'>Weekly</option>
            </Select>
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
          <Preview>
            <div>
              <strong>{form.title}</strong> will be set
              to <strong>{this.state.condition}</strong> on <strong>{this.state.startDate.format(DATE_TIME_FORMAT)}</strong> and
              made <strong>{this.state.condition === 'public' ? 'private' : 'public'}</strong> on <strong>{this.state.endDate.format(DATE_TIME_FORMAT)}</strong>
            </div>
          </Preview>
          <Button type='submit'>
            👌 Save changes
          </Button>
        </form>
      </ScheduleView>
    )
  }
}

export default Scheduler
