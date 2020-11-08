import React from 'react';
import dateToJalali from '../utility/dateToJalali';
import getTime from '../utility/getTime';

class Time extends React.Component {
    state = {date: "", time: "" }

    componentDidMount() {
        setInterval(() => {
            this.setState({date: dateToJalali(), time: getTime()})
        }, 1000);
    }

    render() {
        return (
            <div className="time">
                {this.state.date + this.state.time}
            </div>
        );
    }
}
 
export default Time;