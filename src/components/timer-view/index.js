import React from 'react'

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

        const hours = Math.floor(timeDiff/100/60/60)

        timeDiff -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(timeDiff/1000/60)

        timeDiff -= minutes * 1000 * 60

        const seconds = Math.floor(timeDiff/1000);

        return (
            <div>
                {`${hours}:${minutes}:${seconds}`}
            </div>
        )
    }
}