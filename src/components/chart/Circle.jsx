import React from 'react';

class Circle extends React.Component {
    state = {index: null, hoverId: null}

    componentWillReceiveProps(nextprops) {
        let index;
        let hoverId;
        if (nextprops.circleShow !== null) {
            index = parseInt(nextprops.circleShow.charAt(nextprops.circleShow.length - 1));
            hoverId = nextprops.circleShow.slice(0,6);
        } 
        this.setState({hoverId, index});
    }

    render() { 
        const {answerX, answerY, rejectX, rejectY} = this.props;
        const {hoverId, index} = this.state;
        return (
            <>
            {answerX.map((width, i) => (
                <circle key={"answerCircle" + i} className={(hoverId === "answer" && index === i) ? "answerCircle show" : "answerCircle"}
                    id={"answerCircle_" + i}
                    cx={width}
                    cy={answerY[i]}
                    r="3" stroke="#02A9F5" strokeWidth="1" fill="#42f760" 
                />
            ))}
            {rejectX.map((width, i) => (
                <circle key={"rejectCircle" + i} className={(hoverId === "reject" && index === i) ? "rejectCircle show" : "rejectCircle"}
                    id={"rejectCircle_" + i}
                    cx={width}
                    cy={rejectY[i]}
                    r="3" stroke="#02A9F5" strokeWidth="1" fill="#e74c3c" 
                />
            ))}
            </>
        );
    }
}
 
export default Circle;