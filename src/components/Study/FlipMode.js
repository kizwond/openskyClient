
import React, { Component } from 'react';
import { Avatar, Image, Button, Progress,  Menu, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import ProgressBar from "./progressBar";
import axios from 'axios'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import Timer from './Timer'
import TimerTotal from './TimerTotal'

const session_id = sessionStorage.getItem('session_id')


class FlipMode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contents:[],
      time: 0,
      isOn: false,
      start: 0,
      time_total:0,
      isOn_total:false,
      start_total:0
     };
  }

  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }


  startTimerTotal = () => {
    this.setState({
      isOn_total: true,
      time_total: this.state.time_total,
      start_total: Date.now() - this.state.time_total
    })
    this.timer_total = setInterval(() => this.setState({
      time_total: Date.now() - this.state.start_total
    }), 1);
  }
  stopTimerTotal = () => {
    this.setState({isOn: false})
    clearInterval(this.timer)
    this.setState({isOn_total: false})
    clearInterval(this.timer_total)  
  }

  startTimerResume = () => {
    this.startTimer()
    this.startTimerTotal()
  }

  resetTimer = () => {
    console.log('----------reset timer-------------')
    this.setState({time: 0, isOn:true, start:0})
    clearInterval(this.timer)
    this.startTimer()
    console.log(this.state.time)
    console.log('----------reset timer-------------')
  }

  // console.log('data:', JSON.parse(sessionStorage.getItem('study_setting')))
  componentDidMount(){
    const current_seq = sessionStorage.getItem("current_seq")
    // const session_id = sessionStorage.getItem('session_id')
    axios.post('api/studysetup/get-studying-cards',{
      session_id: session_id,
      current_seq:Number(current_seq),
      num_request_cards:4
    }).then(res => {
      console.log('데이타:', res.data)
      this.setState({
        contents:res.data.cards_to_send.cardlist_working
      })
    })
  }

  onClickDifficulty = (lev, id, book_id)=>{
    this.resetTimer()
    
    const current_seq = sessionStorage.getItem("current_seq")
    const next_seq = Number(current_seq)+1
    sessionStorage.setItem('current_seq',next_seq);
    const req_seq = Number(sessionStorage.getItem("current_seq"))
    let now = new Date();
    // 모르겠음 클릭
    axios.post('api/study-flip/click-difficulty',{
      session_id: session_id,
      difficulty: lev,
      current_seq:Number(current_seq),
      study_hour:this.state.time,
      card_id:id,
      book_id:book_id
    }).then(res => {
        console.log('데이타:', res.data)
    })


    if(this.state.contents.length === 1){
      console.log('below',this.state.contents)
      axios.post('api/studysetup/get-studying-cards',{
        session_id: session_id,
        current_seq:req_seq,
        num_request_cards:4
      }).then(res => {
          console.log('데이타:', res.data)
          const contents = this.state.contents.concat(res.data.cards_to_send.cardlist_working)
          this.setState({
            contents:contents
          })
      })
    } else if(this.state.contents.length === 0){
      alert("학습할 카드가 없습니다. 스터디 메인으로 돌아갑니다.")
      window.location.href="/study"
    }
    console.log("don't know")
    console.log(id)
    const list = this.state.contents.filter(item => item._id._id !== id);
    this.setState({
      contents:list
    })
    
    console.log('here : ',this.state.contents)
    
    
  }

  render() {
    const style_study_layout_container ={
      display:"flex",
      flexDirection:"column",
      height:"45px",
    }
    const style_study_layout_top ={
      display:"flex",
      flexDirection:"row",
      width:"1000px",
      margin:"auto",
    }
    const style_study_layout_top_left ={
      display:"flex",
      flexDirection:"row",
      width:"50%",
      alignItems:"center",
      justifyContent:"space-between",
      marginRight:"15px"
    }
    const style_study_layout_top_right ={
      display:"flex",
      flexDirection:"row",
      width:"50%",
      justifyContent:"space-between",
      border:"1px solid lightgrey",
      borderRadius:"10px",
      backgroundColor:"white",
      padding:5,
      paddingBottom:0,
      fontSize:"12px"
    }
    const style_study_layout_bottom ={
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      width:"1440px",
      margin:"auto",
      marginTop:"10px"
    }
    const menu = (
      <Menu>
        <Menu.Item key="0">
          단기
        </Menu.Item>
        <Menu.Item key="1">
          장기
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          졸업
        </Menu.Item>
      </Menu>
    );
    if(this.state.contents.length > 0){
      var first_face_data = this.state.contents[0]._id.content_of_first_face.map(item => item)
      var second_face_data = this.state.contents[0]._id.content_of_second_face.map(item => item)
      var annotation_data = this.state.contents[0]._id.content_of_annot.map(item => item)
      var id_of_content = this.state.contents[0]._id._id
      var book_id = this.state.contents[0].book_id
    } 

    
    return (
      <div style={style_study_layout_container} className="study_layout_container">
        <div style={style_study_layout_top} className="study_layout_top">
          <ul style={style_study_layout_top_left} className="study_layout_top_left">
            <li style={{marginRight:"10px"}}><Avatar size="large" icon={<UserOutlined />} /></li>
            <li style={{marginRight:"10px", width:"320px"}}>
              <ul>
                <li style={{display:"flex",alignItems:"center",marginBottom:"3px"}}><span style={{marginRight:"10px", width:"40px", fontSize:"11px"}}>완료율</span><ProgressBar bgcolor={"#32c41e"} completed={60} /></li>
                <li style={{display:"flex",alignItems:"center"}}><span style={{marginRight:"10px", width:"40px", fontSize:"11px"}}>학습율</span><ProgressBar bgcolor={"#a1bbe9"} completed={80} /></li>
              </ul>
            </li>
            <li><Button style={{height:"45px", borderRadius:"10px"}}>학습카드추가</Button></li>
          </ul>
          <div style={style_study_layout_top_right} className="study_layout_top_right">
            <Timer 
                  startTimer={this.startTimer} 
                  startTimerTotal={this.startTimerTotal} 
                  stopTimerTotal={this.stopTimerTotal}
                  startTimerResume={this.startTimerResume}
                  time={this.state.time}
                  isOn={this.state.isOn}
                  start={this.state.start}
                  time_total={this.state.time_total}
                  isOn_total={this.state.isOn_total}
                  start_total={this.state.start_total}
            />
          </div>
        </div>
        <div style={style_study_layout_bottom} className="study_layout_middle">
          <div style={{width:"200px", border:"1px solid lightgrey", borderRadius:"10px", textAlign:"right"}}>플래그 영역</div>
          <div style={{width:"1000px", border:"1px solid lightgrey", borderRadius:"10px"}}>
            <div style={{height:"600px", backgroundColor:"white", padding:"10px", borderRadius:"10px 10px 0 0"}}><FroalaEditorView model={first_face_data}/><FroalaEditorView model={second_face_data}/><FroalaEditorView model={annotation_data}/></div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"70px", alignItems:"center", backgroundColor:"#e9e9e9", padding:"10px 90px", borderRadius:"0 0 10px 10px"}}>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_1", id_of_content,book_id)}>모르겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_2", id_of_content,book_id)}>거의모름</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_3", id_of_content,book_id)}>애매함</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_4", id_of_content,book_id)}>거의알겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_5", id_of_content,book_id)}>알겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px", backgroundColor:"#7dbde1"}}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>패스 <DownOutlined /></a>
                </Dropdown>
              </Button>
            </div>
          </div>
          <div style={{width:"200px", border:"1px solid lightgrey", borderRadius:"10px"}}>side 영역</div>
        </div>
      </div>
    );
  }
}

export default FlipMode;