import React from 'react'
import {
  getDurationInString,
} from '../../utils/time-utils'

export class TaskPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='task-preview clearfix'>
        <div className='name'>
          {this.props.name}
        </div>
        <div className='time-spent'>
          {getDurationInString(this.props.timeSpent)}
        </div>
        <div className='time-stamp'>
          {(new Date(this.props.timeStamp)).toLocaleString()}
        </div>
      </div>
    )
  }
}