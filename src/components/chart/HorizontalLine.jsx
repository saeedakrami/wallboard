import React from 'react';

class HorizontalLine extends React.Component {
    state = { thisHorizontalArray: [] }

    componentWillReceiveProps(nextProps) {
        this.drawHorizontalLine(nextProps.maxNumber, nextProps.count, nextProps.horizontalArray);
    }


    drawHorizontalLine = (maxNumber, count, horizontalArray) => {
        let thisHorizontalArray = [];
        if (maxNumber < 500) {
            for (let i = 0; i <= count; i++) {
                thisHorizontalArray.push(horizontalArray[i]);
            }
        } else if (maxNumber < 1000) {
            for (let i = 0; i <= count; i++) {
                if (i !== 1 && i !== 3 && i !== 5)
                    thisHorizontalArray.push(horizontalArray[i]);
            }
        } else if (maxNumber < 2000) {
            for (let i = 0; i <= count; i++) {
                if (i !== 1 && i !== 2 && i !== 3 && i !== 4 && i !== 6 && i !== 7)
                    thisHorizontalArray.push(horizontalArray[i]);
            }
        } else if (maxNumber < 5000) {
            for (let i = 0; i <= count; i++) {
                if (i < 1 || (i > 7 && i !== 9))
                    thisHorizontalArray.push(horizontalArray[i]);
            }
        } else if (maxNumber < 10000) {
            for (let i = 0; i <= count; i++) {
                if (i < 1 || (i > 9 && i !== 11 && i !== 13))
                    thisHorizontalArray.push(horizontalArray[i]);
            }
        }
        this.setState({ thisHorizontalArray });
    }

    render() {
        const { thisHorizontalArray } = this.state;
        return (
            thisHorizontalArray.map((item, i) => ( <
                React.Fragment key = { i } >
                <
                line x1 = "8%"
                x2 = "100%"
                y1 = {
                    ((85 / (thisHorizontalArray.length - 1) * i) + 5) + "%" }
                y2 = {
                    ((85 / (thisHorizontalArray.length - 1) * i) + 5) + "%" }
                stroke = "#0f1924"
                strokeWidth = "1" /
                >
                <
                text x = "7%"
                y = {
                    ((85 / (thisHorizontalArray.length - 1) * i) + 7) + "%" }
                fill = "#ffffff" >
                { thisHorizontalArray[thisHorizontalArray.length - 1 - i] } <
                /text> <
                /React.Fragment>
            ))
        );
    }
}

export default HorizontalLine;