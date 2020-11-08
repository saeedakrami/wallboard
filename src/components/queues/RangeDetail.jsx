import React from 'react';

class RangeDetail extends React.Component {
    state = {  }
    render() { 
        const {thisQueueCalls, allQueueCalls, color} = this.props;
        return (
            <div class="queuesDetailsRow colorWhite">
                <div class="queuesDetailsName">{this.props.title}</div>
                <div class="range">
                    <div class="allCallsRange" style={{width:"100%"}}>
                        <div 
                            class="queuesCallsRange" 
                            style={{width: thisQueueCalls * 100 / allQueueCalls + "%", backgroundColor: color}} 
                        />
                    </div>
                </div>
                <div class="queuesDetailsNumber">{thisQueueCalls}</div>
            </div>
        );
    }
}
 
export default RangeDetail;