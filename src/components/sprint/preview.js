import React from 'react'
import _ from 'underscore'
import { ProgressBar } from 'react-bootstrap'
import './index.less'

// Props
// startDate
// endDate
// sprintIds
// name
// description
// goal: hours
// progress: hours
export class SprintPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='sprint-preview-content'>
        <div className='sprint-preview-header'>
          <div className='name-container'>
            {this.props.name}
          </div>
          <div className='description-container'>
            {this.props.description}
          </div>
          <div>
            <span>{(new Date(this.props.startDate)).toLocaleDateString()}</span>
            <span> - </span>
            <span>{(new Date(this.props.endDate)).toLocaleDateString()}</span>
          </div>
        </div>
        <div className='sprint-preview-body'>
          <div>
            {this.props.progress} / {this.props.goal} achieved
            </div>
          <ProgressBar now={this.props.progress / this.props.goal * 100} />
        </div>
      </div>
    )
  }
}
