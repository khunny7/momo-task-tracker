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
          <span>{this.props.startDate}</span>
        </div>
        <div>
          <span>End Date</span>
          <span>{this.props.endDate}</span>
        </div>
        <div>
          <span>name</span>
          <span>{this.props.name}</span>
        </div>
        <div>
          <span>description</span>
          <span>{this.props.description}</span>
        </div>
        <div>
          <span>goal</span>
          <span>{this.props.goal}</span>
        </div>
        <div>
          <span>progress</span>
          <span>{this.props.progress}</span>
        </div>
      </div>
    )
  }
}