import React, { Component } from 'react';
import { Button } from 'antd';
const ms = require('pretty-ms')

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  componentDidMount(){
    this.props.startTimer()
    this.props.startTimerTotal()
  }

  // startTimer = () => {
  //   this.setState({
  //     isOn: true,
  //     time: this.state.time,
  //     start: Date.now() - this.state.time
  //   })
  //   this.timer = setInterval(() => this.setState({
  //     time: Date.now() - this.state.start
  //   }), 1);
  // }


  // startTimerTotal = () => {
  //   this.setState({
  //     isOn_total: true,
  //     time_total: this.state.time_total,
  //     start_total: Date.now() - this.state.time_total
  //   })
  //   this.timer_total = setInterval(() => this.setState({
  //     time_total: Date.now() - this.state.start_total
  //   }), 1);
  // }
  // stopTimerTotal = () => {
  //   this.setState({isOn: false})
  //   clearInterval(this.timer)
  //   this.setState({isOn_total: false})
  //   clearInterval(this.timer_total)  
  // }

  // startTimerResume = () => {
  //   this.startTimer()
  //   this.startTimerTotal()
  // }


  // resetTimer() {
  //   this.setState({time: 0, isOn: false})
  // }
  
  render() {

    let stop_total = (this.props.time_total  === 0 || !this.props.isOn_total ) ?
      null :
      <Button onClick={this.props.stopTimerTotal} type="primary" danger style={{ width:"80px", borderRadius:"10px"}}>일시정지</Button>

    let resume_total = (this.props.time_total  === 0 || this.props.isOn_total ) ?
      null :
      <Button onClick={this.props.startTimerResume} type="primary" style={{ width:"80px", borderRadius:"10px", backgroundColor:"#1ce400", border:"none"}}>재개</Button>

    return(
      <>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{marginBottom:"0px"}}>현재카드 학습시간</div>
          <h3 style={{width:'100px',fontFamily: 'Mina, sans-serif',fontSize:"20px"}}>{ms(this.props.time,{compact: true, colonNotation: true})}</h3>
        </div>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{marginBottom:"0px"}}>총 경과시간</div>
          <h3 style={{width:'100px',fontFamily: 'Mina, sans-serif',fontSize:"20px"}}>{ms(this.props.time_total ,{compact: true, colonNotation: true})}</h3>
        </div>
        {stop_total}
        {resume_total}
      </>
    )
  }
}
export default Timer