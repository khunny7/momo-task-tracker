import React from 'react'
import { ProgressBar } from 'react-bootstrap'
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
          <div className='description-container'>
            {this.props.sprintPreviewItem.description}
          </div>
          <div>
            <span>{(new Date(this.props.sprintPreviewItem.start)).toLocaleDateString()}</span>
            <span> - </span>
            <span>{(new Date(this.props.sprintPreviewItem.end)).toLocaleDateString()}</span>
          </div>
        </div>
        <div className='sprint-preview-body'>
          <div>
            {this.props.sprintPreviewItem.progress} / {this.props.sprintPreviewItem.goal} achieved
            </div>
          <ProgressBar now={this.props.sprintPreviewItem.progress / this.props.sprintPreviewItem.goal * 100} />
        </div>
      </div>
    )
  }
}
