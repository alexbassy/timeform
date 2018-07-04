import React, { Component } from 'react'
import styled from 'react-emotion'
import WithForms from './WithForms'

const icon = {
  public: `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768"><g/><path d="M384 288c52.5 0 96 43.5 96 96s-43.5 96-96 96-96-43.5-96-96 43.5-96 96-96zm0 256.5c88.5 0 160.5-72 160.5-160.5s-72-160.5-160.5-160.5-160.5 72-160.5 160.5 72 160.5 160.5 160.5zm0-400.5c160.5 0 297 99 352.5 240C681 525 544.5 624 384 624S87 525 31.5 384C87 243 223.5 144 384 144z"/></svg>`,
  private: `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768"><g/><path d="M379.5 288h4.5c52.5 0 96 43.5 96 96v6zm-138 25.5c-10.5 21-18 45-18 70.5 0 88.5 72 160.5 160.5 160.5 25.5 0 49.5-7.5 70.5-18L405 477c-6 1.5-13.5 3-21 3-52.5 0-96-43.5-96-96 0-7.5 1.5-15 3-21zm-177-177L105 96l567 567-40.5 40.5c-35.98-35.52-72.2-70.8-108-106.5-43.5 18-90 27-139.5 27-160.5 0-297-99-352.5-240C57 321 99 267 151.5 225c-29.26-29.24-57.98-59.02-87-88.5zm319.5 87c-21 0-40.5 4.5-58.5 12l-69-69c39-15 82.5-22.5 127.5-22.5 160.5 0 295.5 99 351 240-24 60-61.5 111-109.5 151.5l-93-93c7.5-18 12-37.5 12-58.5 0-88.5-72-160.5-160.5-160.5z"/></svg>`
}

const Container = styled('div')`
  display: flex;
  border-top: 1px solid #eee;
  margin-top: 16px;
`

const FormsList = styled('ul')`
  flex: 1;
  max-width: 300px;
  list-style: none;
  padding: 0;
  margin: 0;
`

const FormItemWrap = styled('li')`
  padding: 12px 8px 12px 0;
  border-bottom: 1px solid var(--schedulerBorderColor);
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

const FormItem = ({ form, onClick }) => {
  const { title, isPublic } = form
  return (
    <FormItemWrap
      onClick={() => onClick(form)}
    >
      <FormItemTitle>
        {title}
      </FormItemTitle>
      <VisibilityStatus>
        <VisibilityIcon src={`data:image/svg+xml;utf8,${isPublic ? icon.public : icon.private }`} />
        {isPublic ? 'Public' : 'Private'}
      </VisibilityStatus>
    </FormItemWrap>
  )
}

const ScheduleView = styled('div')`
  flex: 1;
  border-left: 1px solid var(--schedulerBorderColor);
`

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
          <Container>
            <FormsList>
              {forms.items.map(form => (
                <FormItem
                  key={form.id}
                  form={form}
                  onClick={() => this.setState({ selectedForm: form })}
                />
              ))}
            </FormsList>
            <ScheduleView form={this.state.selectedForm} />
          </Container>
        )}
      </WithForms>
    )
  }
}

export default Scheduler
