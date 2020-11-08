import React from 'react';
import CallsDetail from './CallsDetail';
import Logo from './Logo';

class CallsDetails extends React.Component {
    state = {  }

    render() { 
        return (
            <div className="calls">
                <Logo />
                <CallsDetail 
                    text={this.props.allCallsDetails.queueCalls.text}
                    number={this.props.allCallsDetails.queueCalls.number}
                    className="callsNumber queueNumber"
                />
                <CallsDetail
                    text={this.props.allCallsDetails.recievedCalls.text}
                    number={this.props.allCallsDetails.recievedCalls.number}
                    className="callsNumber"
                />
                <CallsDetail 
                    text={this.props.allCallsDetails.answerCalls.text}
                    number={this.props.allCallsDetails.answerCalls.number}
                    className="callsNumber"
                />
            </div>
        );
    }
}
 
export default CallsDetails;