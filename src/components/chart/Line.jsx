import React from 'react';

class Line extends React.Component {
    state = {answerPath: "", rejectPath: "", overPath: ""}
    componentWillReceiveProps(props) {
        let answerPath = `M30 200 L30 ${props.pathPosition[0].answerY + 10} `;
        let rejectPath = `M30 200 L30 ${props.pathPosition[0].rejectY + 10} `;
        let answerY1 = 0;
        let answerX1 = 0;
        props.pathPosition.map((item, i) => {

            if (i!== 0 && i< props.pathPosition.length -1) {
                answerX1 = (props.pathPosition[i+1].answerX - item.answerX)/3
                if (item.answerY < props.pathPosition[i+1].answerY && item.answerY > props.pathPosition[i-1].answerY) {
                    answerY1 = -(props.pathPosition[i+1].answerY - item.answerY)/3;
                } else if (item.answerY > props.pathPosition[i+1].answerY && item.answerY < props.pathPosition[i-1].answerY) {
                    answerY1 = (props.pathPosition[i+1].answerY - item.answerY)/3;
                }

                // answerPath += `C ${props.pathPosition[i-1].answerX + answerX1} ${props.pathPosition[i-1].answerY + answerY1} ${item.answerX - answerX1} ${item.answerY + answerY1} ${item.answerX} ${item.answerY} `
            }
                answerPath += `L${item.answerX} ${item.answerY} `;
                rejectPath += `L${item.rejectX} ${item.rejectY} `;
        });
        answerPath += `L${props.pathPosition[props.pathPosition.length-1].answerX + 30}
         ${props.pathPosition[props.pathPosition.length-1].answerY + 10} 
         L${props.pathPosition[props.pathPosition.length-1].answerX + 30} 200 L30 200`;
        rejectPath += `L${props.pathPosition[props.pathPosition.length-1].rejectX + 30}
        ${props.pathPosition[props.pathPosition.length-1].rejectY + 10} 
        L${props.pathPosition[props.pathPosition.length-1].rejectX + 30} 200 L30 200`;
        this.setState({answerPath, rejectPath});
    }

    answerMouseover = (e) => {
        this.setState({overPath: "answer"});
        this.props.answerMouseover(e);
    }

    answerAndRejectMouseout = () => {
        this.setState({overPath: ""});
        this.props.answerAndRejectMouseout();
    }

    rejectMouseover = (e) => {
        this.setState({overPath: "reject"});
        this.props.rejectMouseover(e);
    }

    render() { 
        return (
            <>
                <path 
                    d={this.state.answerPath}
                    className="chartPath"
                    strokeDasharray="1000"
                    fill="transparent"
                    stroke="#42f760"
                    strokeWidth="2" 
                    strokeOpacity={this.state.overPath === "answer" ? "1" : this.state.overPath === "reject" ? "0.3" : "0.8"} 
                    onMouseMove={this.answerMouseover}
                    onMouseOut={this.answerAndRejectMouseout}
                />
                <path 
                    d={this.state.answerPath}
                    fill="transparent" 
                    fillOpacity={this.state.overPath === "answer" ? "1" : this.state.overPath === "reject" ? "0.3" : "0.8"} 
                    onMouseMove={this.answerMouseover}
                    onMouseOut={this.answerAndRejectMouseout}
                >
                    <animate attributeName="fill" from="transparent" to="#42f760" begin="1s" dur="1s" fill="freeze" repeatCount="1" />
                </path>
                <path 
                    d={this.state.rejectPath}
                    className="chartPath"
                    strokeDasharray="1000"
                    fill="transparent"
                    stroke="#e74c3c"
                    strokeWidth="2" 
                    strokeOpacity={this.state.overPath === "reject" ? "1" : this.state.overPath === "answer" ? "0.3" : "0.8"} 
                    onMouseMove={this.answerMouseover}
                    onMouseOut={this.answerAndRejectMouseout}
                />
                <path 
                    d={this.state.rejectPath}
                    fill="transparent"
                    fillOpacity={this.state.overPath === "reject" ? "1" : this.state.overPath === "answer" ? "0.3" : "0.8"}
                    onMouseMove={this.rejectMouseover}
                    onMouseOut={this.answerAndRejectMouseout}
                >
                    <animate attributeName="fill" from="transparent" to="#e74c3c" begin="1s" dur="1s" fill="freeze" repeatCount="1" />
                </path>
            
            <rect width="55" height="200" fill="#172332" x="0" y="0" />
            <rect width="100%" height="60" fill="#172332" x="0" y="157" /> 
            </>
        );
    }
}
 
export default Line;