import React from 'react'
import { getDurationInString } from '../../utils/time-utils'

export class TimerView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let timeDiff = 0;

        if (this.props.start) {
            if (this.props.end) {
                timeDiff = this.props.end - this.props.start;
            }
        }

        return (
            <div>
                {getDurationInString(timeDiff)}
            </div>
        )
    }
}