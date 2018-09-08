import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import {
  getDurationInHours,
  getDurationInString,
} from '../../utils/time-utils'

// Props
// startDate
// endDate
// sprintIds
// name
// description
// goal: hours
// progress: hours
export class ProjectPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  _tryShowProgressBar(previewItem) {
    if (previewItem.goal) {
      return (
        <div className="progress-view">
          <div className="progress-in-string">
            <span>{getDurationInString(this.props.projectPreviewItem.progress)}</span>
            <span> / </span>
            <span>{this.props.projectPreviewItem.goal}</span>
            <span> Hours achieved </span>
          </div>
          <ProgressBar
            now={getDurationInHours(this.props.projectPreviewItem.progress) / this.props.projectPreviewItem.goal * 100} />
        </div>
      )
    } else {
      return (
        <div className="no-progress-string">
          No goal exists for this project. Goal can be set by setting goals in sprints.
        </div>
      )
    }
  }

  render() {
    if (this.props.isMinimized) {
      return (
        <div className="preview-content minimized">
          <div className="preview-content-header">
            <div className="project-name">
              {this.props.projectPreviewItem.name}
            </div>
            <div className="date-range">
              <span>{(new Date(this.props.projectPreviewItem.start)).toLocaleDateString()}</span>
              <span> - </span>
              <span>{(new Date(this.props.projectPreviewItem.end)).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="preview-content">
        <div className="preview-content-header">
          <div className="project-name">
            {this.props.projectPreviewItem.name}
          </div>
          <div className="date-range">
            <span>{(new Date(this.props.projectPreviewItem.start)).toLocaleDateString()}</span>
            <span> - </span>
            <span>{(new Date(this.props.projectPreviewItem.end)).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="preview-content-body">
          <div className="preview-description">
            {this.props.projectPreviewItem.description}
          </div>
          {
            this._tryShowProgressBar(this.props.projectPreviewItem)
          }
        </div>
      </div>
    )
  }
}