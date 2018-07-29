import React, { Component } from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import WeekTimePicker from './WeekTimePicker'
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
  height: 100%;
  overflow: auto;
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
    this.state = {}
  }

  handleStartDateChange (time) {
    this.setState({ startDate: time })
  }

  handleEndDateChange (time) {
    this.setState({ endDate: time })
  }

  changeCondition (ev) {
    this.setState({ condition: ev.target.value })
  }

  changeFrequency (ev) {
    this.setState({ frequency: ev.target.value })
  }

  onEnableOrDisable (ev) {
    this.setState({ enabled: ev.target.value })
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
            <WeekTimePicker
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
          </FormGroup>
          <FormGroup title='End time'>
            <WeekTimePicker
              value={this.state.endDate}
              onChange={this.handleEndDateChange}
            />
          </FormGroup>
          <FormGroup title='Enabled'>
            <input
              name='enabled'
              type='checkbox'
              defaultChecked={this.state.enabled}
              onChange={this.onEnableOrDisable}
            />
          </FormGroup>
          <Preview>
            <div>
              <strong>{form.title}</strong> will be set
              to <strong>{this.state.condition}</strong> on <strong>{this.state.startDate.format('dddd[s at] HH:mm')}</strong> and
              made <strong>{this.state.condition === 'public' ? 'private' : 'public'}</strong> on <strong>{this.state.endDate.format('dddd[s at] HH:mm')}</strong>
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

Scheduler.getDerivedStateFromProps = (props, state) => {
  // component is mounted for the first time
  const rule = props.form && props.form.rule
  if (rule && props.form.id !== state.formId) {
    return {
      formId: props.form.id,
      startDate: moment(rule.begin),
      endDate: moment(rule.end),
      condition: rule.condition,
      frequency: rule.recurring,
      enabled: rule.enabled
    }
  }

  // component is updated with new form
  if (props.form.id !== state.formId) {
    return {
      formId: props.form.id,
      startDate: moment(),
      endDate: moment().add(1, 'day'),
      condition: 'private',
      frequency: 'weekly',
      enabled: true
    }
  }

  return null
}

export default Scheduler
