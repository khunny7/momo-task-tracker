import React from 'react'

export class TaskPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.name}
        </div>
        <div>
          {this.props.lastModified}
        </div>
        <div>
          {this.props.durationOnTask}
        </div>
      </div>
    )
  }
}