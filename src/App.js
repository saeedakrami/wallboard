import React from 'react';
import Time from './components/Time';
import CallsDetails from './components/CallsDetails';
import SlaChart from './components/SlaChart';
import AnswerAndRejectChart from './components/AnswerAndRejectChart';
import QueuesDetails from './components/QueuesDetails';
import QueuesCommonDetails from './components/QueuesCommonDetails';
// import Historical from './test/historical.json';
// import Line from './test/line.json';

class App extends React.Component {
  state = {
    totalConnectedData: {}, totalDisconnectedData: {},
    allCallsDetails: {},
    queuesDetails: [],
    answerCallChartHorizontalArray: [0, 100, 200, 300, 400, 500, 600, 800, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 8000, 10000],
    gettingData: false,
  }

  componentDidMount() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
    }
    };
    
    setInterval(this.getData,5000,'http://192.168.102.45:81/line', requestOptions);
    setInterval(this.getHistoricalData,1800000, 'http://192.168.102.45:81/historical', requestOptions);
  }

  getData = (url, option) => {
    fetch(url, option)
        .then(res => res.json())
        .then(data => {
            this.getTotalData(data.result.Total);
            this.getOrdinaryData(data.result.Ordinary);
  
        });
  
    // this.getTotalConnectedOrDisconnectedData(Historical.result.Total);
    // getOrdinaryData(Historical.result.Ordinary);
  
    // this.getTotalData(Line.result.Total);
    // this.getOrdinaryData(Line.result.Ordinary);
    
  
  }

  getHistoricalData = (url, option) => {
    fetch(url, option)
        .then(res => res.json())
        .then(data => {
          this.getTotalConnectedOrDisconnectedData(data.result.Total);
        })
        .catch(err => console.log(err))
  }
  
  // let ordinaryConnectedData = [];
  // let ordinaryDisconnectedData = [];
  
  getTotalConnectedOrDisconnectedData = (responseData) => {
    let totalConnectedData = {"7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0};
    let totalDisconnectedData = {"7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0};
    Object.keys(responseData).map((item, i) => {
        if (parseInt(item) > 0) {
            totalConnectedData[item] = Object.values(responseData)[i];
        } else {
            totalDisconnectedData[(parseInt(item) * -1).toString()] = Object.values(responseData)[i];
        }
    });
    this.setState({totalConnectedData, totalDisconnectedData});
  }
  
  // const getOrdinaryData = (responseData) => {
  //   Object.keys(responseData).map((item, i) => {
  //       if (parseInt(item) > 0) {
  //           ordinaryConnectedData.push(
  //               Object.values(responseData)[i]
  //           )
  //       } else {
  //           ordinaryDisconnectedData.push(
  //               Object.values(responseData)[i] * -1
  //           )
  //       }
  //   })
    
  // }
  
  getTotalData = (responseData) => {
    let totalCalls = 0;
    let totalConnectedCalls = 0;
    let totalQueueCalls = 0;
    let totalSla = 0;
    totalCalls = responseData['Total Calls'];
    totalConnectedCalls = responseData['Connected'];
    totalQueueCalls = responseData['Queue'];
    totalSla = responseData['SLA'];
    let allCallsDetails = {
      recievedCalls : { text: "تماس های ورودی", number: totalCalls },
      answerCalls : { text: "پاسخ داده شده", number: totalConnectedCalls },
      queueCalls : { text: "تماس های درصف", number: totalQueueCalls },
      slaCalls : { text: "Service Level", number: totalSla * 100 }, 
    } 
    this.setState({allCallsDetails});
  }
  
  
  getOrdinaryData = (responseData) => {
    let ordinaryTotalCalls = 0;
    let ordinaryConnectedCalls = 0;
    let ordinaryQueueCalls = 0;
    let ordinaryLastWaiting = 0;
    let ordinarySla = 0;
    let ordinaryAvgWaiting = 0;
    ordinaryTotalCalls = responseData["Total Calls"];
    ordinaryConnectedCalls = responseData['Connected'];
    ordinaryQueueCalls = responseData['Queue'];
    ordinaryLastWaiting = responseData['last Person Wait Time'];
    ordinarySla = responseData['SLA'];
    ordinaryAvgWaiting = responseData['Avg Wait Time'];
    let queuesDetails = [{
      queuesName: "Ordinary",
      recievedCalls: ordinaryTotalCalls,
      answerCalls: ordinaryConnectedCalls,
      queuesCalls: ordinaryQueueCalls,
      slaCalls: ordinarySla * 100,
      lastWaitingTime: ordinaryLastWaiting,
      averageWaitingTime: ordinaryAvgWaiting,
      freeAgents: 0,
  },
  ];
    this.setState({queuesDetails: queuesDetails, gettingData: true})
  }

  render() { 
    const {
      totalConnectedData, totalDisconnectedData,
      allCallsDetails,
      queuesDetails, answerCallChartHorizontalArray,
      gettingData
    } = this.state;
    return (
      <>
      {gettingData && (
        <div className="container">
        <div className="row">
          <div className="col-3">
              <CallsDetails allCallsDetails = {allCallsDetails} />
          </div>
          <div className="col-3" style={{alignSelf: "flex-end"}}>
            {allCallsDetails.slaCalls && (
              <SlaChart sla={allCallsDetails.slaCalls.number} />
            )}
          </div>
          <div className="col-6">
            <Time />
            <AnswerAndRejectChart answer={totalConnectedData} reject={totalDisconnectedData} horizontalArray={answerCallChartHorizontalArray} />
          </div>
        </div>
        <div className="row queue">
          <div className="col-6">
            <QueuesCommonDetails data={queuesDetails} allCallsData={allCallsDetails} />
          </div>
          {queuesDetails.map(item => (
            <div className="col-6">
              <QueuesDetails data={item} allCallsData={allCallsDetails} />
            </div>
          ))}
        </div>
      </div>
      )}
      </>
      
    );
  }
}
 
export default App;
