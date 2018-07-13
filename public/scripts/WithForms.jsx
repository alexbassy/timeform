import React, { Component } from 'react'
import styled from 'react-emotion'
import { getForms } from './api-lib'
import { insertSpinner } from './dom-lib'

const cached = {"count":19,"pages":1,"items":[{"id":"nh7r3S","title":"Standup record keeper","lastUpdated":"2018-06-28T08:54:07+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/nh7r3S"},{"id":"PFJBMy","title":"Form with other field","lastUpdated":"2018-06-27T15:38:59+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/PFJBMy"},{"id":"HEpG1a","title":"How helpful was this?","lastUpdated":"2018-06-15T16:57:48+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/HEpG1a"},{"id":"T2ZfMy","title":"Customer Feedback","lastUpdated":"2018-06-07T08:31:09+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/T2ZfMy"},{"id":"M72WRC","title":"Very short German form with HubSpot Integration","lastUpdated":"2018-06-04T08:58:20+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/M72WRC"},{"id":"Af5xJz","title":"Team Breakfasts","lastUpdated":"2018-04-27T09:07:42+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/Af5xJz"},{"id":"CzydoC","title":"GDPR (email for advanced)","lastUpdated":"2018-03-22T11:53:34+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/CzydoC"},{"id":"ijjGIk","title":"GDPR (email for intermediate )","lastUpdated":"2018-03-22T11:48:02+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/ijjGIk"},{"id":"kUeGNf","title":"GDPR (email for beginner only)","lastUpdated":"2018-03-22T11:47:04+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/kUeGNf"},{"id":"xKSYoc","title":"GDPR","lastUpdated":"2018-03-22T16:35:12+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/xKSYoc"},{"id":"jK0vqb","title":"A lot of responses","lastUpdated":"2018-03-19T18:44:12+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/jK0vqb"},{"id":"Bm3ly8","title":"Generic contact form","lastUpdated":"2018-06-10T16:32:25+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/Bm3ly8"},{"id":"ZEbL2o","title":"To-do","lastUpdated":"2018-03-20T11:27:31+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/ZEbL2o"},{"id":"gV0NkV","title":"All Fields","lastUpdated":"2018-02-07T13:17:33+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/gV0NkV"},{"id":"bWZ4Ie","title":"Frontend Questionnaire","lastUpdated":"2017-11-17T10:30:13+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/bWZ4Ie"},{"id":"Zzcp0A","title":"Team building ideas","lastUpdated":"2018-02-11T13:57:55+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/Zzcp0A"},{"id":"XR2aKM","title":"Offsite","lastUpdated":"2017-11-06T20:21:38+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/XR2aKM"},{"id":"JiGbYW","title":"Discover Project Survey","lastUpdated":"2017-08-28T09:21:43+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/JiGbYW"},{"id":"Lk8K65","title":"Intro Typeform","lastUpdated":"2018-03-23T17:23:56+00:00","isPublic":true,"isTrial":false,"url":"https://api.typeform.com/forms/Lk8K65"}]}

const LoadingWrap = styled('div')`
  position: relative;
  height: 120px;
`

class WithForms extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.loadingContainer = React.createRef()
  }

  async componentDidMount () {
    // add loading spinner
    this.spinner = insertSpinner(this.loadingContainer.current, { color: '#333', })
    const forms = await getForms()
    setTimeout(() => this.setState({ forms }), 300)
    console.log(forms)
  }

  render () {
    if (this.state.forms) {
      if (this.spinner) {
        this.spinner.stop()
        this.spinner = null
      }
      return this.props.children(this.state.forms)
    }

    return (
      <div>
        <LoadingWrap innerRef={this.loadingContainer}></LoadingWrap>
      </div>
    )
  }
}

export default WithForms
