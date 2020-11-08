import React from 'react';
import RangeDetail from './queues/RangeDetail';
import OtherDetail from './queues/OtherDetail';

class QueuesDetails extends React.Component {
    state = {lastMin: 0, lastSecond: 0, averageMin: 0, averageSecond: 0  }

    componentDidMount() {
        let lastMin = Math.floor(this.props.data.lastWaitingTime / 60000);
        let lastSecond = Math.floor((this.props.data.lastWaitingTime - lastMin * 60000) / 1000);
        if (lastSecond < 10) lastSecond = "0" + lastSecond;
        let averageMin = Math.floor(this.props.data.averageWaitingTime / 60000);
        let averageSecond = Math.floor((this.props.data.averageWaitingTime - averageMin * 60000) / 1000);
        if (averageSecond < 10) averageSecond = "0" + averageSecond;
        this.setState({lastMin, lastSecond, averageMin, averageSecond})
    }

    render() { 
        const {data, allCallsData} = this.props;
        const {lastMin, lastSecond, averageMin, averageSecond} = this.state;
        return (
            <div className="queuesDetails">
                <div className="alignCenter colorWhite">{data.queuesName}</div>
                    {/* <RangeDetail 
                        title="تماس های درصف:" 
                        thisQueueCalls={data.queuesCalls} 
                        allQueueCalls={allCallsData.queueCalls.number}
                        color={data.queuesCalls > 10 ? "#ff0800" : data.queuesCalls > 5 ? "#ffa200" : "#19bd3f"}
                    />
                    <RangeDetail 
                        title="SLA:" 
                        thisQueueCalls={data.slaCalls} 
                        allQueueCalls={100}
                        color={data.slaCalls < 40 ? "#ff0800" : data.slaCalls < 70 ? "#ffa200" : "#19bd3f"}
                    /> */}
                    <OtherDetail data={data.queuesCalls} class="timeValue" iconName="call_queue" color={data.queuesCalls >=10 ? "#ff1700" : data.queuesCalls >=5 ? "#ffa200" : "#15bd40"}/>
                    <OtherDetail iconName="last_time_queue" data={lastMin + " : " + lastSecond} class="timeValue last" />
                    {/* <OtherDetail title="میانگین زمان انتظار" data={averageMin + " : " + averageSecond} class="timeValue average" /> */}
                    <OtherDetail iconName="agent" data={data.freeAgents} class="personValue" color={data.freeAgents === 0 ? "#ff1700" : data.freeAgents === 1 ? "#ffa200" : "#15bd40"} />
            </div>
        );
    }
}
 
export default QueuesDetails;