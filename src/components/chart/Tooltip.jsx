import React from 'react';

class Tooltip extends React.Component {
    state = {index: null, hoverId: null}

    componentWillReceiveProps(nextprops) {
        let index;
        let hoverId;
        if (nextprops.show !== null) {
            index = parseInt(nextprops.show.match(/\d+/)[0]);
            hoverId = nextprops.show.slice(0,6);
        }
        this.setState({hoverId, index});
    }

    render() { 
        const {tooltipPosition, answer, reject} = this.props;
        const {hoverId, index} = this.state;
        return (
            tooltipPosition.map((item, i) => (
                <React.Fragment key={i}>
                    <path 
                        className={(hoverId === "answer" && index === i) ? "answerTooltip show" : "answerTooltip"} 
                        d={"M " +  item.answerToolTipX + " " + item.answerToolTipY + " " + item.answerToolTipPath} 
                        fill="#ffffff" stroke="#42f760" strokeWidth="1" 
                    />
                    <path 
                        className={(hoverId === "reject" && index === i) ? "rejectTooltip show" : "rejectTooltip"} 
                        d={'M ' + item.rejectToolTipX + " " + item.rejectToolTipY + " " + item.rejectToolTipPath} 
                        fill="#ffffff" stroke="#e74c3c" strokeWidth="1" 
                    />
                    <text 
                        className={(hoverId === "answer" && index === i) ? "answerTooltipText show" : "answerTooltipText"} 
                        x={item.answerTooltipTextX} y={item.answerTooltipTextY}
                    >
                        {answer[i]}
                    </text>
                    <text 
                        className={(hoverId === "reject" && index === i) ? "rejectTooltipText show" : "rejectTooltipText"} 
                        x={item.rejectTooltipTextX} y={item.rejectTooltipTextY}
                    >
                        {reject[i]}
                    </text>
                </React.Fragment>
            ))
            
        );
    }
}
 
export default Tooltip;