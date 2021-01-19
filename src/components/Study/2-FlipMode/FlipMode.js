
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
      page_toggle:false,
      level_config:[],
      cardlist_studying:[],
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
    this.setState({isOn_total: false})
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
    // this.getCardContents()
  }

  getCardList = async () => {
    await axios.post('api/studyexecute/get-cardlist',{
      session_id: session_id,
    }).then(res => {
      console.log("here22222222222")
      console.log(res.data)
      console.log("카드리스트 : ",res.data.cardlist_studying)
      console.log("레벨설정값 : ",res.data.level_config)
      
      sessionStorage.setItem('level_config',JSON.stringify(res.data.level_config));
      sessionStorage.setItem('cardlist_studying',JSON.stringify(res.data.cardlist_studying));
      this.setState({
        cardlist_studying:res.data.cardlist_studying,
        level_config:res.data.level_config
      })
    })
    this.getCardContents()
  }

  getCardContents = () => {
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    const ids = []
    const card_ids = card_ids_session.map((item) => {
      ids.push(item._id)
    })
    console.log('ids',ids)
    axios.post('api/studyexecute/get-studying-cards',{
      card_ids: ids
    }).then(res => {
      console.log("카드리스트 받아보자")
      console.log("카드 컨텐츠 : ",res.data)
      this.setState({
        contents:res.data.cards
      })
    })
  }
  milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);

  
  onClickDifficulty = (lev, id, book_id, interval, time_unit)=>{
    const now = new Date();
    console.log('선택한 난이도', lev)
    console.log('현재카드_id', id)
    console.log('쳔재카드 book_id', book_id)
    console.log('난이도 별 복습주기', interval)
    console.log('난이도 별 복습주기 단위', time_unit)
    const current_seq = sessionStorage.getItem("current_seq")
    const next_seq = Number(current_seq)+1
    sessionStorage.setItem('current_seq',next_seq);
    const req_seq = Number(sessionStorage.getItem("current_seq"))
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    console.log('card_ids_session',card_ids_session[0].detail_status.session_study_times)
    const prev_session_study_times = card_ids_session[0].detail_status.session_study_times
    const prev_current_lev_study_times = card_ids_session[0].detail_status.current_lev_study_times
    const prev_total_study_times = card_ids_session[0].detail_status.total_study_times
    card_ids_session[0].detail_status.session_study_times = prev_session_study_times + 1
    card_ids_session[0].detail_status.current_lev_study_times = prev_current_lev_study_times + 1
    card_ids_session[0].detail_status.total_study_times = prev_total_study_times + 1
    card_ids_session[0].detail_status.recent_difficulty = lev
    card_ids_session[0].detail_status.recent_study_hour = now
    card_ids_session[0].detail_status.recent_study_time = this.state.time
    
    const now_mili_convert = Date.parse(now);
    const result = this.milliseconds(0, interval, 0);
    const need_review_time = now_mili_convert + result
    console.log(need_review_time)

    const review_date = new Date(need_review_time);
    card_ids_session[0].detail_status.need_study_time = review_date
    console.log('지금', now)
    console.log('복습',review_date)
    console.log('card_ids_session updated!!',card_ids_session[0].detail_status)

    
    // axios.post('api/study-flip/click-difficulty',{
    //   session_id: session_id,
    //   difficulty: lev,
    //   current_seq:Number(current_seq),
    //   study_hour:this.state.time,
    //   card_id:id,
    //   book_id:book_id
    // }).then(res => {
    //     console.log('데이타:', res.data)
    // })


    // if(this.state.contents.length === 1){
    //   console.log('below',this.state.contents)
    //   axios.post('api/studysetup/get-studying-cards',{
    //     session_id: session_id,
    //     current_seq:req_seq,
    //     num_request_cards:4
    //   }).then(res => {
    //       console.log('데이타:', res.data)
    //       const contents = this.state.contents.concat(res.data.cards_to_send.cardlist_working)
    //       this.setState({
    //         contents:contents
    //       })
    //   })
    // } else 
    
    if(this.state.contents.length === 1){
      alert("학습할 카드가 없습니다. 스터디 메인으로 돌아갑니다.")
      window.location.href="/study"
    }

    const list = this.state.contents.filter(item => item._id !== id);
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
    const nicks = []
    const interval = []
    const time_unit = []

    if(this.state.contents.length > 0){
      var first_face_data = this.state.contents[0].contents.face1.map(item => <FroalaEditorView key={item} model={item}/>)
      var second_face_data = this.state.contents[0].contents.face2.map(item => <FroalaEditorView key={item} model={item}/>)
      // var annotation_data = this.state.contents[0]._id.content_of_annot.map(item => <FroalaEditorView model={item}/>)
      var id_of_content = this.state.contents[0]._id
      var book_id = this.state.contents[0].book_id
      const level_config_sessionStorage = JSON.parse(sessionStorage.getItem('level_config'))
      const nicks_handle = level_config_sessionStorage.map((item)=>{
        if(item.book_id === this.state.contents[0].book_id){
          nicks.push(item.difficulty_setting.diffi1.nick)
          nicks.push(item.difficulty_setting.diffi2.nick)
          nicks.push(item.difficulty_setting.diffi3.nick)
          nicks.push(item.difficulty_setting.diffi4.nick)
          nicks.push(item.difficulty_setting.diffi5.nick)
          interval.push(item.difficulty_setting.diffi1.interval)
          interval.push(item.difficulty_setting.diffi2.interval)
          interval.push(item.difficulty_setting.diffi3.interval)
          interval.push(item.difficulty_setting.diffi4.interval)
          interval.push(item.difficulty_setting.diffi5.interval)
          time_unit.push(item.difficulty_setting.diffi1.time_unit)
          time_unit.push(item.difficulty_setting.diffi2.time_unit)
          time_unit.push(item.difficulty_setting.diffi3.time_unit)
          time_unit.push(item.difficulty_setting.diffi4.time_unit)
          time_unit.push(item.difficulty_setting.diffi5.time_unit)
        }
      })
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
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi1", id_of_content,book_id, interval[0], time_unit[0])}>{nicks[0]}</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi2", id_of_content,book_id, interval[1], time_unit[1])}>{nicks[1]}</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi3", id_of_content,book_id, interval[2], time_unit[2])}>{nicks[2]}</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi4", id_of_content,book_id, interval[3], time_unit[3])}>{nicks[3]}</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi5", id_of_content,book_id, interval[4], time_unit[4])}>{nicks[4]}</Button>
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