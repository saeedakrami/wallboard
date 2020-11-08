import React from 'react';

class CircleChart extends React.Component {
    state = {  }

    circlePathMouseover = (index) => {
        let thisSection = document.getElementById(this.props.name + 'circleChart' + index);
        let thisLegend = document.getElementById(this.props.name + "circleChartLegend" + index);
        thisSection.setAttribute("r","53");
        thisLegend.setAttribute("style", "background-color:" + this.props.color[index]);
    }

    circlePathMouseout = (index) => {
        let thisSection = document.getElementById(this.props.name + 'circleChart' + index);
        thisSection.setAttribute("r","50");
        let thisLegend = document.getElementById(this.props.name + "circleChartLegend" + index);
        thisLegend.removeAttribute('style');
    }

    render() {
        let recieveDashOffset=[];
        let recieveRotate=[];
        this.props.queueCalls.map((item,i) => {
            recieveDashOffset.push(item/this.props.allCalls*314.15);
            let sum=0;
            for (let j=0;j<i;j++) {
                sum += recieveDashOffset[j];
            }
            recieveRotate.push(sum*360/314.15);
        })
        return (
            <div className="row" style={{height: "50%"}}>
                <div className="col-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="130px" height="130px" style={{position: "relative"}}>
                    {recieveDashOffset.map((item,i) => (
                            <circle 
                                key={i}
                                cx="65" cy="65" r="50" 
                                fill="none"
                                id={this.props.name + "circleChart" + i}
                                strokeWidth="20" stroke={this.props.color[i]} 
                                strokeDasharray="314.15" 
                                strokeDashoffset={314.15 - item}
                                transform={"rotate(" + recieveRotate[i]  + " 65 65)"}
                                onMouseOver={() => this.circlePathMouseover(i)}
                                onMouseOut={() => this.circlePathMouseout(i)}
                            />
                        )
                    )}
                    <g transform="translate(145 430)">
                        <path 
                        d="M-65.224-359.142l-0.147-0.445c-0.353-1.045-1.504-2.135-2.563-2.422l-3.918-1.07c-1.063-0.289-2.578,0.1-3.354,0.877   
                        l-1.418,1.418c-5.153-1.393-9.194-5.434-10.586-10.586l1.418-1.418c0.777-0.777,1.166-2.291,0.878-3.354l-1.068-3.92   
                        c-0.289-1.063-1.381-2.214-2.424-2.563l-0.447-0.15c-1.045-0.348-2.535,0.004-3.313,0.781l-2.12,2.123   
                        c-0.38,0.377-0.621,1.455-0.621,1.459c-0.074,6.734,2.565,13.225,7.33,17.986c4.752,4.752,11.216,7.389,17.931,7.332   
                        c0.035,0,1.145-0.238,1.523-0.615l2.12-2.121C-65.228-356.604-64.875-358.097-65.224-359.142L-65.224-359.142z" 
                        fill={this.props.name === "recieve" ? "#02a9f5" : "#8bc44a"}
                        />
                    </g>
                </svg>
                </div>
                <div className="col-7">
                {this.props.queuesName.map((item,i) => (
                    <div className="queueCharts colorWhite" id={this.props.name + "circleChartLegend" + i} onMouseOver={() => this.circlePathMouseover(i)}
                    onMouseOut={() => this.circlePathMouseout(i)}>
                        <div>
                            <div className="legendColorGuide" style={{backgroundColor: this.props.color[i]}}></div>
                            {item}
                        </div>
                        <div>{this.props.queueCalls[i]}</div>
                    </div>
                ))}
                </div>
            </div>
        );
    }
}
 
export default CircleChart;