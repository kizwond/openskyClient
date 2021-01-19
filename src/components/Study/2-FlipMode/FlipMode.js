
import React, { Component } from 'react';
import { Avatar, Button,  Menu, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import ProgressBar from "./progressBar";
import axios from 'axios'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import Timer from './Timer'

const session_id = sessionStorage.getItem('sessionId')


class FlipMode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contents:[],
      time: 0,
      start: 0,
      time_total:0,
      isOn_total:false,
      start_total:0,
      page_toggle:false
     };
  }

  startTimer = () => {
    console.log('starttimer')
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
    console.log('stop timer')
    console.log(this)
    this.setState({isOn_total: false}, function(){
      console.log(this)
      
    })
    clearInterval(this.timer_total)  
    clearInterval(this.timer)
  }

  startTimerResume = () => {
    this.startTimer()
    this.startTimerTotal()
  }

  resetTimer = () => {
    this.setState({time: 0, start:0}, function(){
      this.startTimer()
      this.startTimerTotal()
    })
  }

  // console.log('data:', JSON.parse(sessionStorage.getItem('study_setting')))
  componentDidMount(){
    console.log("here!!!!!!!!!!!!!!!!!")
    this.getCardList()
    this.getCardContents()
  }

  getCardList = () => {
    axios.post('api/studyexecute/get-cardlist',{
      session_id: session_id,
    }).then(res => {
      console.log("here22222222222")
      console.log("카드리스트 : ",res.data.cardlist_studying)
      console.log("레벨설정값 : ",res.data.level_config)
      
      sessionStorage.setItem('level_config',JSON.stringify(res.data.level_config));
      sessionStorage.setItem('cardlist_studying',JSON.stringify(res.data.cardlist_studying));
      this.setState({
        cardlist_studying:res.data.cardlist_studying
      })
    })
  }

  getCardContents = () => {

    axios.post('api/studyexecute/get-studying-cards',{
      card_ids: JSON.parse(sessionStorage.getItem('cardlist_studying'))
    }).then(res => {
      console.log("카드리스트 받아보자")
      console.log("카드 컨텐츠 : ",res.data)
      
    })
  }

  onClickDifficulty = (lev, id, book_id)=>{
    const current_seq = sessionStorage.getItem("current_seq")
    const next_seq = Number(current_seq)+1
    sessionStorage.setItem('current_seq',next_seq);
    const req_seq = Number(sessionStorage.getItem("current_seq"))

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
    }, function(){
      this.stopTimerTotal()
      this.resetTimer()
    })
    this.setState({
      page_toggle:false
    })
    console.log('here : ',this.state.contents)
    
  }
  onClickPage = () => {
    console.log('page clicked to flip')
      this.setState(prevState => ({
        page_toggle: !prevState.page_toggle
      })
    )
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
      var first_face_data = this.state.contents[0]._id.content_of_first_face.map(item => <FroalaEditorView model={item}/>)
      var second_face_data = this.state.contents[0]._id.content_of_second_face.map(item => <FroalaEditorView model={item}/>)
      // var annotation_data = this.state.contents[0]._id.content_of_annot.map(item => <FroalaEditorView model={item}/>)
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
            <div onClick={this.onClickPage} style={{ height:"600px", backgroundColor:"white", padding:"10px", borderRadius:"10px 10px 0 0", display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{position:"relative", height:"50%", width:"100%", border:"1px dashed lightgrey", borderRadius:"5px"}}>
                <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>{first_face_data}</div>
              </div>
              <div style={{position:"relative", height:"50%", width:"100%", border:"1px dashed lightgrey", borderRadius:"5px"}}>
                <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>{this.state.page_toggle? second_face_data : null}</div>
              </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"70px", alignItems:"center", backgroundColor:"#e9e9e9", padding:"10px 90px", borderRadius:"0 0 10px 10px"}}>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_1", id_of_content,book_id)}>모르겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_2", id_of_content,book_id)}>거의모름</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_3", id_of_content,book_id)}>애매함</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_4", id_of_content,book_id)}>거의알겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("lev_5", id_of_content,book_id)}>알겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px", backgroundColor:"#7dbde1"}}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>패스 <DownOutlined /></span>
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