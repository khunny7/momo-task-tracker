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
      <div>
        <div>
          <span>Start Date</span>
          <span>{(new Date(this.props.projectPreviewItem.start)).toLocaleDateString()}</span>
        </div>
        <div>
          <span>End Date</span>
          <span>{(new Date(this.props.projectPreviewItem.end)).toLocaleDateString()}</span>
        </div>
        <div>
          <span>name</span>
          <span>{this.props.projectPreviewItem.name}</span>
        </div>
        <div>
          <span>description</span>
          <span>{this.props.projectPreviewItem.description}</span>
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
    )
  }
}