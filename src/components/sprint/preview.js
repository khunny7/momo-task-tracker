import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import {
  getDurationInHours,
  getDurationInString,
} from '../../utils/time-utils'
import './index.less'

export class SprintPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='sprint-preview-content'>
        <div className='sprint-preview-header'>
          <div className='name-container'>
            {this.props.sprintPreviewItem.name}
          </div>
          <div className="date-range">
            <span>{(new Date(this.props.sprintPreviewItem.start)).toLocaleDateString()}</span>
            <span> - </span>
            <span>{(new Date(this.props.sprintPreviewItem.end)).toLocaleDateString()}</span>
          </div>
        </div>
        <div className='preview-content-body'>
          <div className='preview-description'>
            {this.props.sprintPreviewItem.description}
          </div>
          <div className="progress-in-string">
            {getDurationInString(this.props.sprintPreviewItem.progress, 'progress')} / {this.props.sprintPreviewItem.goal} hours
          </div>
          <ProgressBar now={getDurationInHours(this.props.sprintPreviewItem.progress) / this.props.sprintPreviewItem.goal * 100} />
        </div>
      </div>
    )
  }
}
