import React from 'react'

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

  render() {
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
          <div>
            {this.props.projectPreviewItem.description}
          </div>
          <div>
            <span>goal</span>
            <span>{this.props.projectPreviewItem.goal}</span>
          </div>
          <div>
            <span>progress</span>
            <span>{this.props.projectPreviewItem.progress}</span>
          </div>
        </div>
      </div>
    )
  }
}