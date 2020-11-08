import React from 'react';
import CircleChart from './queues/CircleChart';

class QueuesCommonDetails extends React.Component {
    state = {  }

    render() { 
        let allRecievedCalls = this.props.allCallsData.recievedCalls.number;
        let allAnswerCalls = this.props.allCallsData.answerCalls.number;
        let queuesName = [];
        let queueRecievedCalls = [];
        let queueAnswerCalls = [];
        for (let i=0;i<this.props.data.length; i++) {
            queuesName.push(this.props.data[i].queuesName);
            queueRecievedCalls.push(this.props.data[i].recievedCalls);
            queueAnswerCalls.push(this.props.data[i].answerCalls);
        }
        return (
            <div className="queuesDetails">
                <CircleChart 
                    allCalls={allRecievedCalls}
                    queuesName={queuesName}
                    queueCalls={queueRecievedCalls}
                    queueAnswerCalls={queueAnswerCalls}
                    color={["#8bc44a","#e74c3c","#02a9f5","#ff9900"]}
                    name="recieve"
                />
                <CircleChart 
                    allCalls={allAnswerCalls}
                    queuesName={queuesName}
                    queueCalls={queueAnswerCalls}
                    color={["#8bc44a","#e74c3c","#02a9f5","#ff9900"]}
                    name="answer"
                />
            </div>
        );
    }
}
 
export default QueuesCommonDetails;