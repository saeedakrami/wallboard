import React from 'react';
import HorizontalLine from './chart/HorizontalLine';
import VerticalLabel from './chart/VerticalLabel';
import Circle from './chart/Circle';
import Line from './chart/Line';
import Tooltip from './chart/Tooltip'; 

class AnswerAndRejectChart extends React.Component {
    state = {
        time: [],
        answer: [],
        reject: [],
        maxNumber: 0,
        count: 0,
        thisHorizontalArray: [],
        textX: [],
        textY: [],
        answerCircleX: [],
        answerCircleY: [],
        rejectCircleX: [],
        rejectCircleY: [],
        tooltipPosition: [],
        tooltipShow: null,
        pathPosition: [],
        circleShow: null,
    }
    componentDidMount() {
        let element = document.getElementsByClassName('answerAndRejectChartSVG')[0];
        let height = element.clientHeight;
        let width = element.clientWidth;
        let time = [];
        let answer = [];
        let reject = [];
        for (let i in this.props.answer) {
            time.push(i);
            answer.push(this.props.answer[i]);
            reject.push(this.props.reject[i]);
        }
        let maxNumber = Math.max(...answer, ...reject);
        let count = Math.floor(maxNumber / 100) + 1;
        if (count === 8 || count === 9) count--;
        else if (count === 10) count = count - 2;
        else if (count >= 11 && count <= 15) count = 9;
        else if (count >= 16 && count <= 20) count = 10;
        else if (count >= 21 && count <= 30) count = 11;
        else if (count >= 31 && count <= 40) count = 12;
        else if (count >= 41 && count <= 50) count = 13;
        else if (count >= 51 && count <= 60) count = 14;
        else if (count >= 61 && count <= 80) count = 15;
        else if (count >= 81 && count <= 100) count = 16;
        this.setState({maxNumber, count, time, answer, reject});

        let textX = [];
        let textY = height;
        let answerCircleX = [];
        let answerCircleY = [];
        let rejectCircleX = [];
        let rejectCircleY = [];
        let tooltipPosition = [];
        let pathPosition = [];

        answer.map((item, i) => {
            textX.push(this.mathX(width, 13, answer, i, 11));
            answerCircleX.push(this.mathX(width, 13, answer, i, 11));
            answerCircleY.push(this.mathY(height, 10, answer, i, 15, this.props.horizontalArray[count]));
            rejectCircleX.push(this.mathX(width, 13, reject, i, 11));
            rejectCircleY.push(this.mathY(height, 10, reject, i, 15, this.props.horizontalArray[count]));
            pathPosition.push({
                answerX: this.mathX(width,13,answer,i,11),
                answerY: this.mathY(height, 10, answer, i, 15, this.props.horizontalArray[count]),
                rejectX: this.mathX(width,13,reject,i,11),
                rejectY: this.mathY(height, 10, reject, i, 15, this.props.horizontalArray[count]),
            })
            let answerToolTipX =  this.mathX(width, 13, answer, i, 11);
            let answerToolTipY = this.mathY(height, 13, answer, i, 15, this.props.horizontalArray[count]);
            let rejectToolTipX = this.mathX(width, 13, reject, i, 11);
            let rejectToolTipY = this.mathY(height, 13, reject, i, 15, this.props.horizontalArray[count]);
            let answerTooltipTextX = answerToolTipX + 10;
            let answerTooltipTextY = answerToolTipY - 16;
            let rejectTooltipTextX = rejectToolTipX + 10;
            let rejectTooltipTextY = rejectToolTipY - 16;
            let answerToolTipPath = "l-4 -8 l-14 0 s-4 0 -4 -4 l0 -20 s0 -4 4 -4 l36 0 s4 0 4 4 l0 20 s0 4 -4 4  l-14 0 l-4 8";
            let rejectToolTipPath = "l-4 -8 l-14 0 s-4 0 -4 -4 l0 -20 s0 -4 4 -4 l36 0 s4 0 4 4 l0 20 s0 4 -4 4  l-14 0 l-4 8";
            let isTop = false;
            if (answerToolTipY < 40) isTop = true;
            if (isTop) {
                answerToolTipY = answerToolTipY + 10;
                answerTooltipTextY = answerToolTipY + 30;
                answerToolTipPath = "l-4 8 l-14 0 s-4 0 -4 4 l0 20 s0 4 4 4 l36 0 s4 0 4 -4 l0 -20 s0 -4 -4 -4 l-14 0 l-4 -8"
            }
            if (answerToolTipX > width - 20) {
                let dx = answerToolTipX - width + 20;
                if (isTop) answerToolTipPath = `l-${dx} 8 l-20 0 s-4 0 -4 4 l0 20 s0 4 4 4 l36 0 s4 0 4 -4 l0 -20 s0 -4 -4 -4 l-8 0 l${dx-8} -8`;
                else answerToolTipPath = `l-${dx} -8 l-20 0 s-4 0 -4 -4 l0 -20 s0 -4 4 -4 l36 0 s4 0 4 4 l0 20 s0 4 -4 4 l-8 0 l${dx-8} 8`;
                answerTooltipTextX = width - 10;
            }
            if (rejectToolTipY < 40) {
                rejectToolTipY = rejectToolTipY + 10;
                rejectTooltipTextY = rejectToolTipY + 30;
                rejectToolTipPath = "l-4 8 l-14 0 s-4 0 -4 4 l0 20 s0 4 4 4 l36 0 s4 0 4 -4 l0 -20 s0 -4 -4 -4 l-14 0 l-4 -8"
            }
            if (rejectToolTipX > width - 20) {
                let dx = rejectToolTipX - width + 20;
                if (rejectToolTipY < 40) rejectToolTipPath = `l-${dx} 8 l-20 0 s-4 0 -4 4 l0 20 s0 4 4 4 l36 0 s4 0 4 -4 l0 -20 s0 -4 -4 -4 l-8 0 l${dx-8} -8`;
                else rejectToolTipPath = `l-${dx} -8 l-20 0 s-4 0 -4 -4 l0 -20 s0 -4 4 -4 l36 0 s4 0 4 4 l0 20 s0 4 -4 4 l-8 0 l${dx-8} 8`;
                rejectTooltipTextX = width - 10;
            }

            tooltipPosition.push({
                answerToolTipX: answerToolTipX,
                answerToolTipY: answerToolTipY,
                rejectToolTipX: rejectToolTipX,
                rejectToolTipY: rejectToolTipY,
                answerTooltipTextX: answerTooltipTextX,
                answerTooltipTextY: answerTooltipTextY,
                rejectTooltipTextX: rejectTooltipTextX,
                rejectTooltipTextY: rejectTooltipTextY,
                answerToolTipPath: answerToolTipPath,
                rejectToolTipPath: rejectToolTipPath
            });
        })
        this.setState({textX, textY, answerCircleX, answerCircleY, rejectCircleX, rejectCircleY, tooltipPosition, pathPosition});


    }

    mathX = (width, x1, obj, i, x2) => (width - (width * x1 / 100)) / (obj.length - 1) * i + (width * x2 / 100);

    mathY = (height, y1, obj, i, y2, maxLabel) => (height - (height * y1 / 100)) - (obj[i] * (height - (height * y2 / 100)) / maxLabel);

    handleMouseover = (id) => {
        this.setState({tooltipShow: id});
    }

    handleMouseout = () => {
        this.setState({tooltipShow: null})
    }

    answerMouseover = (e) => {
        for (let i=0; i<this.state.pathPosition.length-1;i++) {
            if (e.pageX > this.state.pathPosition[i].answerX && e.pageX < (this.state.pathPosition[i+1].answerX + this.state.pathPosition[i].answerX)/2) {
                this.setState({circleShow: "answerCircle_" + i});
            } else if (e.pageX > (this.state.pathPosition[this.state.pathPosition.length-1].answerX + this.state.pathPosition[this.state.pathPosition.length-2].answerX)/2)
            this.setState({circleShow: "answerCircle_" + (this.state.pathPosition.length-1)});
        }
    }
    
    rejectMouseover = (e) => {
        for (let i=0; i<this.state.pathPosition.length-1;i++) {
            if (e.pageX > this.state.pathPosition[i].rejectX && e.pageX < (this.state.pathPosition[i+1].rejectX + this.state.pathPosition[i].rejectX)/2) {
                this.setState({circleShow: "rejectCircle_" + i});
            } else if (e.pageX > (this.state.pathPosition[this.state.pathPosition.length-1].rejectX + this.state.pathPosition[this.state.pathPosition.length-2].rejectX)/2)
            this.setState({circleShow: "rejectCircle_" + (this.state.pathPosition.length-1)});
        }
    }

    answerAndRejectMouseout = () => {
        this.setState({circleShow: null});
    }

    render() { 
        const {answer, 
            reject, 
            maxNumber, 
            count, 
            time, 
            textX, 
            textY, 
            answerCircleX, 
            answerCircleY, 
            rejectCircleX, 
            rejectCircleY,
            tooltipPosition, 
            tooltipShow,
            pathPosition,
            circleShow
        } = this.state;
        return (
            <div className="answerAndRejectChart">
                <div className="answerAndRejectChartTitle">
                    <div className="chartTitle">Answer and Reject Calls</div>
                    <div className="guide">
                        <div className="answerGuide"></div>
                        <div className="guideTitle">Answered</div>
                    </div>
                    <div className="guide">
                        <div className="rejectGuide"></div>
                        <div className="guideTitle">Rejected</div>
                    </div>
                </div>
                <svg className="answerAndRejectChartSVG" xmlns="http://www.w3.org/2000/svg" width="100%" height="85%">
                    <Line pathPosition={pathPosition} answerMouseover={this.answerMouseover} rejectMouseover={this.rejectMouseover} answerAndRejectMouseout={this.answerAndRejectMouseout} />
                    <HorizontalLine maxNumber={maxNumber} count={count} horizontalArray={this.props.horizontalArray} />
                    <VerticalLabel x={textX} y={textY} time={time} />
                    <Circle answerX={answerCircleX} answerY={answerCircleY} rejectX={rejectCircleX} rejectY={rejectCircleY} handleMouseover={this.handleMouseover} handleMouseout={this.handleMouseout} circleShow={circleShow} />
                    <Tooltip tooltipPosition={tooltipPosition} answer={answer} reject={reject} show={circleShow} />
                </svg>
            </div>
        );
    }
}
 
export default AnswerAndRejectChart;