import React from 'react';

class CallsDetail extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="callsDetail">
                <span className='callsText'>{this.props.text}</span>
                <span className={this.props.className}>{this.props.number}</span>
            </div>
        );
    }
}
 
export default CallsDetail;