import React from 'react';

class SlaChart extends React.Component {
    state = {}

    
    render() {
        return (
            <div className="slaCallsChart">
                <div className="slaCallsChartTitle">SERVICE LEVEL AGREEMENT</div>
                <svg className="shadow" xmlns="http://www.w3.org/2000/svg" width="300px" height="180px">
                    <path d="M0 150, A150 150 0 0 1 75 20 L95 54 A110 110 0 0 0 40 150 L0 150" fill="#ff1700" />
                    <path d="M75 20, A150 150 0 0 1 225 20 L205 54 A110 110 0 0 0 95 54 L75 20" fill="#ffa200" />
                    <path d="M225 20, A150 150 0 0 1 300 150 L260 150 A110 110 0 0 0 205 54 L225 20" fill="#15bd40" />
                    <text x="180" y="70" fill={this.props.sla <= 33 ? "#ff1700" : this.props.sla <= 67 ? "#ffa200" : "#15bd40"} className="slaChartText">
                        {this.props.sla}%
                    </text>
                    <path d="M157 157 L157 143 L20 150 L157 157" fill="#514f4f" stroke="#000000" strokeWidth="0.1" 
                    transform={"rotate(" + this.props.sla*1.8 + ", 150, 150)"}
                    />
                    <circle cx="150" cy="150" r="10" fill="#514f4f" stroke="#000000" strokeWidth="0.1" />
                    <circle cx="150" cy="150" r="4" fill="#000000" stroke="#000000" strokeWidth="0.1" />
                </svg>
            </div>
        );
    }
}
 
export default SlaChart;