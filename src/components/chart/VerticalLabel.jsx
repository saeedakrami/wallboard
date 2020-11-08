import React from 'react';

class VerticalLabel extends React.Component {
    state = {  }
    render() {
        const {x, y, time} = this.props;
        return(
            <>
            {
                x.map((width,i) => (
                    <text textAnchor="middle" key={i} x={width} y={y} fill="#ffffff">{time[i]}</text>
                ))
            }
            </>
        )
    }
}
 
export default VerticalLabel;