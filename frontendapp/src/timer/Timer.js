import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';


class Timer extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
    	time: parseInt(this.props.minutes)*60,
    	isOn: false

    }
  }

componentDidMount() {
	this.setState({
      isOn: true
	});
	this.timer = setInterval(() => {
		return this.setState(function(prevState){
			let remainingTime = prevState.time-1;
			if(remainingTime <= 0){
				clearInterval(this.timer);
        this.props.handleTimeOut();
			}
      return {time: (prevState.time - 1)}
    });
  }, 1000);
}

componentWillUnmount(){
	this.setState({isOn: false});
    clearInterval(this.timer);
    this.props.handleTimeOut();
}

secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return hours + " hours " + minutes + " minutes " + seconds + " seconds";
}

 

  

  render() {

    return (
       <span id="timerCount" className="timerCount">{this.state.time < 600 ? "Last " +parseInt(this.state.time/60)+ " minute(s) " : this.secondsToTime(this.state.time)}</span>
    );
  }

}


export default Timer;
