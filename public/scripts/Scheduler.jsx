import React, { Component } from 'react'
import styled from 'react-emotion'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import WithForms from './WithForms'
import { saveRule } from './api-lib'

import 'react-datepicker/dist/react-datepicker.css'

const DATE_TIME_FORMAT = 'dddd[s at] HH:mm'

const icon = {
  public: ({ fill }) => `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768"><g/><path d="M384 288c52.5 0 96 43.5 96 96s-43.5 96-96 96-96-43.5-96-96 43.5-96 96-96zm0 256.5c88.5 0 160.5-72 160.5-160.5s-72-160.5-160.5-160.5-160.5 72-160.5 160.5 72 160.5 160.5 160.5zm0-400.5c160.5 0 297 99 352.5 240C681 525 544.5 624 384 624S87 525 31.5 384C87 243 223.5 144 384 144z" fill="${fill}"/></svg>`,
  private: ({ fill }) => `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768"><g/><path d="M379.5 288h4.5c52.5 0 96 43.5 96 96v6zm-138 25.5c-10.5 21-18 45-18 70.5 0 88.5 72 160.5 160.5 160.5 25.5 0 49.5-7.5 70.5-18L405 477c-6 1.5-13.5 3-21 3-52.5 0-96-43.5-96-96 0-7.5 1.5-15 3-21zm-177-177L105 96l567 567-40.5 40.5c-35.98-35.52-72.2-70.8-108-106.5-43.5 18-90 27-139.5 27-160.5 0-297-99-352.5-240C57 321 99 267 151.5 225c-29.26-29.24-57.98-59.02-87-88.5zm319.5 87c-21 0-40.5 4.5-58.5 12l-69-69c39-15 82.5-22.5 127.5-22.5 160.5 0 295.5 99 351 240-24 60-61.5 111-109.5 151.5l-93-93c7.5-18 12-37.5 12-58.5 0-88.5-72-160.5-160.5-160.5z" fill="${fill}"/></svg>`
}

const Container = styled('div')`
  display: flex;
  border-top: 1px solid #eee;
  margin-top: 16px;
`

const FormGroupWrap = styled('div')`
  margin-bottom: 16px;
`

const Label = styled('label')`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
`

const FormsListWrap = styled('div')`
  flex: 1;
  max-width: 300px;
`

const FormsList = styled('ul')`
  flex: 1;
  max-width: 300px;
  max-height: 600px;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
  -webkit-overflow-scrolling: touch;
`

const FormItemWrap = styled('li')`
  padding: 12px;
  border-bottom: 1px solid var(--schedulerBorderColor);
  background: ${props => props.isSelected ? 'var(--activeColour)' : '#fff'};
  color: ${props => props.isSelected ? '#fff' : '#444'};
  user-select: none;
  
  :last-child {
    border-bottom: none;
  }
`

const FormItemTitle = styled('div')`
  font-size: 16px;
  max-width: calc(100% - 8px);
  margin-bottom: 8px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: pre;
  overflow: hidden;
`

const VisibilityStatus = styled('div')`
  display: flex;
  font-size: 14px;
`

const VisibilityIcon = styled('img')`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  
`

const Footer = styled('footer')`
  font-size: 14px;
  padding: 12px;
  color: #777;
  text-align: center;
  border-top: 1px solid var(--schedulerBorderColor);
`

const FormItem = ({ form, onClick, isSelected }) => {
  const { title, isPublic } = form
  const visibilityIconColour = isSelected ? '#fff' : '#444'
  const visibilityIcon = isPublic
    ? icon.public({ fill: visibilityIconColour })
    : icon.private({ fill: visibilityIconColour })

  return (
    <FormItemWrap
      isSelected={isSelected}
      onClick={() => onClick(form)}
    >
      <FormItemTitle>
        {title}
      </FormItemTitle>
      <VisibilityStatus>
        <VisibilityIcon src={`data:image/svg+xml;utf8,${visibilityIcon}`} />
        {isPublic ? 'Public' : 'Private'}
      </VisibilityStatus>
    </FormItemWrap>
  )
}

const ScheduleView = styled('div')`
  flex: 1;
  border-left: 1px solid var(--schedulerBorderColor);
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

class Schedule extends Component {
  constructor (props) {
    super(props)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    const form = this.props.form || {}

    this.setState({
      startDate: moment(form.rule.begin),
      endDate: form.rule.end ? moment(form.rule.end) : moment().add(1, 'day'),
      condition: form.rule.condition,
      frequency: form.rule.recurring,
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
              showTimeSelect
              locale='en-gb'
              timeFormat='HH:mm'
              timeIntervals={10}
              dateFormat={DATE_TIME_FORMAT}
              timeCaption='time'
            />
          </FormGroup>
          <FormGroup title='End time'>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
              showTimeSelect
              locale='en-gb'
              timeFormat='HH:mm'
              timeIntervals={10}
              dateFormat={DATE_TIME_FORMAT}
              timeCaption='time'
            />
          </FormGroup>
          <FormGroup title='Preview'>
            <strong>{form.title}</strong> will be set to <strong>{this.state.condition}</strong> every <strong>{this.state.startDate.format(DATE_TIME_FORMAT)}</strong> and made <strong>{this.state.condition === 'public' ? 'private' : 'public'}</strong> on <strong>{this.state.endDate.format(DATE_TIME_FORMAT)}</strong>
          </FormGroup>
          <button type='submit'>Save</button>
        </form>
      </ScheduleView>
    )
  }
}

class Scheduler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedForm: null
    }
  }

  render () {
    return (
      <WithForms>
        {forms => (
          <div>
            <Container>
              <FormsListWrap>
                <FormsList>
                  {forms.items.map(form => (
                    <FormItem
                      key={form.id}
                      form={form}
                      isSelected={this.state.selectedForm && this.state.selectedForm.id === form.id}
                      onClick={() => this.setState({ selectedForm: form })}
                    />
                  ))}
                </FormsList>
              </FormsListWrap>
              {this.state.selectedForm && <Schedule form={this.state.selectedForm} />}
            </Container>
            <Footer>
              {forms.count} forms
            </Footer>
          </div>
        )}
      </WithForms>
    )
  }
}

export default Scheduler
