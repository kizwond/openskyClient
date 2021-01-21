
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
    const current_seq = sessionStorage.getItem("current_seq")
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    const now = new Date();
    const reviewExist = card_ids_session.map(item =>{
      if(item.detail_status.need_study_time !== null){
        if(new Date(item.detail_status.need_study_time) < now){
          return item._id
        }
      }
    })

    const reviewNotExist = card_ids_session.map(item =>{
      if(item.detail_status.need_study_time === null){
          return item._id
      }
    })
    
    console.log('reviewExist',reviewExist)
    console.log('reviewNotExist',reviewNotExist)
    if(reviewExist.length > 0){
      if(reviewExist[0] === undefined){
        var ids = reviewNotExist
        const newIdsArray = ids.splice(current_seq, 1)
          console.log(newIdsArray)
          console.log('ids',ids)
          axios.post('api/studyexecute/get-studying-cards',{
            card_ids: newIdsArray
          }).then(res => {
            console.log("카드리스트 받아보자")
            console.log("카드 컨텐츠 : ",res.data)
            const contents = this.state.contents.concat(res.data.cards)
            this.setState({
              contents:contents
            })
          })
      } else {
        ids = reviewExist
        const newIdsArray = ids.splice(current_seq, 1)
          console.log(newIdsArray)
          console.log('ids',ids)
          axios.post('api/studyexecute/get-studying-cards',{
            card_ids: newIdsArray
          }).then(res => {
            console.log("카드리스트 받아보자")
            console.log("카드 컨텐츠 : ",res.data)
            const contents = res.data.cards.concat(this.state.contents)
            this.setState({
              contents:contents
            })
          })
      }
    }
  }

  getCardContentsAdd = () => {
    const current_seq = sessionStorage.getItem("current_seq")
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    const now = new Date();
    const reviewExist = card_ids_session.map(item =>{
      // console.log("here exist")
      if(item.detail_status.need_study_time !== null){
        // console.log("here2@@@@@@@@@@")
        // console.log('time compare',new Date(item.detail_status.need_study_time))
        // console.log('time now    ',now)
        // let a = new Date(item.detail_status.need_study_time)
        // a.setHours(a.getHours()-9)
        // console.log('a',a)
        if(new Date(item.detail_status.need_study_time) < now){
          return item._id
        }
      }
    })

    const reviewNotExist = card_ids_session.map(item =>{
          return item._id
    })
    // const reviewNotExist = card_ids_session.map(item =>{
    //   if(item.detail_status.need_study_time === null){
    //       return item._id
    //   }
    // })

    
    const reviewExist_filtered = reviewExist.filter(function (el) {
      return el != null;
    });
    // const reviewNotExist_filtered = reviewNotExist.filter(function (el) {
    //   return el != null;
    // });
    
    console.log('reviewExist',reviewExist_filtered)
    // console.log('reviewNotExist',reviewNotExist_filtered)

    if(reviewExist_filtered.length > 0){
      const ids = reviewExist_filtered
      const newIdsArray = ids.splice(0, 1)
        console.log('ids',ids)
        console.log(newIdsArray)
        axios.post('api/studyexecute/get-studying-cards',{
          card_ids: newIdsArray
        }).then(res => {
          console.log("세션 신규 카드 컨텐츠 : ",res.data.cards)
          const contents = res.data.cards.concat(this.state.contents)
          console.log('contents review exist',contents)
          const result = contents.filter((item, i) => {
            return (
              contents.findIndex((item2, j) => {
                return item._id === item2._id;
              }) === i
            );
          });
          console.log('uniqueArr review exist',result)
          this.setState({
            contents:result
          })
        })
    } else {
        const current_seq = sessionStorage.getItem("current_seq")
        const next_seq = Number(current_seq)+1
        sessionStorage.setItem('current_seq',next_seq);
        console.log('cardlist length',this.state.cardlist_studying.length)
        console.log('current_seq', next_seq+1)
        if(this.state.cardlist_studying.length === next_seq+1){
          console.log("final card ")
        }
        if(this.state.cardlist_studying.length === next_seq){
          alert("학습할 카드가 없습니다. 스터디 메인으로 돌아갑니다.")
          window.location.href="/study"
        }
        const ids = reviewNotExist
        const newIdsArray = ids.splice(next_seq, 1)
        console.log('ids',ids)
        console.log(newIdsArray)
        axios.post('api/studyexecute/get-studying-cards',{
          card_ids: newIdsArray
        }).then(res => {
          console.log("세션 복습 카드 컨텐츠 : ",res.data.cards)
          const contents = this.state.contents.concat(res.data.cards)
          console.log('contents review not exist',contents)
          const result = contents.filter((item, i) => {
            return (
              contents.findIndex((item2, j) => {
                return item._id === item2._id;
              }) === i
            );
          });
          console.log('uniqueArr review not exist',result)
          this.setState({
            contents:result
          })
        })
    }

  }


  milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);

  leadingZeros = (n, digits) => {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }

  // getTimeStamp = (review_date) => {
  //   var d = review_date;
  //   var s =
  //     this.leadingZeros(d.getFullYear(), 4) + '-' +
  //     this.leadingZeros(d.getMonth() + 1, 2) + '-' +
  //     this.leadingZeros(d.getDate(), 2) + 'T' +
  
  //     this.leadingZeros(d.getHours(), 2) + ':' +
  //     this.leadingZeros(d.getMinutes(), 2) + ':' +
  //     this.leadingZeros(d.getSeconds(), 2) +'.000'+'Z';
  
  //   return s;
  // }
    
  onClickDifficulty = (lev, id, book_id, interval, time_unit, card_level)=>{
    console.log('현재카드 레벨', card_level)
    console.log('선택한 난이도', lev)
    console.log('현재카드_id', id)
    console.log('현재카드 book_id', book_id)
    console.log('난이도 별 복습주기', interval)
    console.log('난이도 별 복습주기 단위', time_unit)

    

    //현재시간 기준
    const now = new Date();

    //세션스토리지에서 카드리스트 정보 가져오기
    const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))

    //해당 카드 인텍스 찾기
    const selectedIndex = card_ids_session.findIndex((item, index)=>{
      return item._id === id
    })
    //현재카드 학습정보 조회
    const selectedCard = card_ids_session.find((item, index)=>{
      if(item._id === id){
        return item
      }
    })

    //세션스토리지에서 레벨설정 정보 가져오기
    const level_config_session = JSON.parse(sessionStorage.getItem('level_config'))
    console.log('경험치관련 level_config : ' , level_config_session)

    //현재카드가 속한 책의 레벨설정 정보 가져오기 
    const selected_card_book_level_config = level_config_session.map(item=>{
      if(item.book_id === book_id){
        return item
      }
    })
    console.log('현재책 레벨설정', selected_card_book_level_config[0])

    //current_lev_study_times 기준으로 경험치 저장
    if(lev === "diffi5"){
      console.log("here fired!!!")
      const current_lev_study_times_selected = selectedCard.detail_status.current_lev_study_times
      if(current_lev_study_times_selected === 0){
        var exp_gain = selected_card_book_level_config[0].exp_setting.one_time
      } else if(current_lev_study_times_selected === 1){
        exp_gain = selected_card_book_level_config[0].exp_setting.two_times
      } else if(current_lev_study_times_selected === 2){
        exp_gain = selected_card_book_level_config[0].exp_setting.three_times
      } else if(current_lev_study_times_selected === 3){
        exp_gain = selected_card_book_level_config[0].exp_setting.four_times
      } else if(current_lev_study_times_selected === 4){
        exp_gain = selected_card_book_level_config[0].exp_setting.five_times
      } else if(current_lev_study_times_selected > 4){
        exp_gain = selected_card_book_level_config[0].exp_setting.five_times
      }
  
      const prev_exp = card_ids_session[selectedIndex].detail_status.exp
      card_ids_session[selectedIndex].detail_status.exp = prev_exp + exp_gain

      const gained_level = Math.floor(prev_exp + exp_gain / 1000)
      console.log(gained_level)

      if(gained_level === 1 ){
        var interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_1.interval
        var time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_1.time_unit
      } else if(gained_level === 2 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_2.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_2.time_unit
      } else if(gained_level === 3 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_3.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_3.time_unit
      } else if(gained_level === 4 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_4.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_4.time_unit
      } else if(gained_level === 5 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_5.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_5.time_unit
      } else if(gained_level === 6 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_6.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_6.time_unit
      } else if(gained_level === 7 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_7.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_7.time_unit
      } else if(gained_level === 8 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_8.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_8.time_unit
      } else if(gained_level === 9 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_9.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_9.time_unit
      } else if(gained_level > 10 ){
        interval_diffi5 = selected_card_book_level_config[0].lev_setting.lev_10.interval
        time_unit_diffi5 = selected_card_book_level_config[0].lev_setting.lev_10.time_unit
      }

      const now_mili_convert = Date.parse(now);
      if(time_unit_diffi5 === "min"){
        var result = this.milliseconds(0, interval_diffi5, 0);
      } else if(time_unit_diffi5 === "hour"){
        result = this.milliseconds(interval_diffi5, 0, 0);
      } else if(time_unit_diffi5 === "day"){
        result = this.milliseconds(interval_diffi5*24, 0, 0);
      }
      const need_review_time = now_mili_convert + result
      const review_date = new Date(need_review_time)
      card_ids_session[selectedIndex].detail_status.need_study_time = review_date
      card_ids_session[selectedIndex].detail_status.level = gained_level
      card_ids_session[selectedIndex].detail_status.current_lev_study_times = 0

    }    

    //변동레벨 저장

    //세션내에 해당 카드 학습횟수 저장 (해당세션내에서 학습횟수 출력위한 정보)
    const prev_session_study_times = card_ids_session[selectedIndex].detail_status.session_study_times
    card_ids_session[selectedIndex].detail_status.session_study_times = prev_session_study_times + 1

    //해당 카드가 마지막 알겠음 버튼 클릭 후 학습횟수 (레벨설정에서 경험치 증감 기준을 위한 학습횟수 정보)
    if(lev !== "diffi5"){
      const prev_current_lev_study_times = card_ids_session[selectedIndex].detail_status.current_lev_study_times
      card_ids_session[selectedIndex].detail_status.current_lev_study_times = prev_current_lev_study_times + 1
    }
    

    //해당 카드의 총 학습횟수 저장
    const prev_total_study_times = card_ids_session[selectedIndex].detail_status.total_study_times
    card_ids_session[selectedIndex].detail_status.total_study_times = prev_total_study_times + 1

    //선택한 난이도 저장 
    card_ids_session[selectedIndex].detail_status.recent_difficulty = lev

    //해당카드 학습경과시간
    card_ids_session[selectedIndex].detail_status.recent_study_hour = this.state.time

    //해당카드 총 학습경과시간
    const prev_total_study_hour = card_ids_session[selectedIndex].detail_status.total_study_hour
    card_ids_session[selectedIndex].detail_status.total_study_hour = prev_total_study_hour + this.state.time

    //해당카드 학습시간
    card_ids_session[selectedIndex].detail_status.recent_study_time = now
    
    //복습시간 저장
    if(lev !== 'diffi5'){
      const now_mili_convert = Date.parse(now);
      if(time_unit === "min"){
        var result = this.milliseconds(0, interval, 0);
      } else if(time_unit === "hour"){
        result = this.milliseconds(interval, 0, 0);
      } else if(time_unit === "day"){
        result = this.milliseconds(interval*24, 0, 0);
      }
      const need_review_time = now_mili_convert + result
      const review_date = new Date(need_review_time)
      card_ids_session[selectedIndex].detail_status.need_study_time = review_date
    }
    

    

    //해당카드 최종 업데이트 콘솔로그
    console.log('card_ids_session updated!!',card_ids_session[selectedIndex].detail_status)

    //세션스토리지에 최종 저장
    console.log('before saving',card_ids_session)
    sessionStorage.setItem('cardlist_studying',JSON.stringify(card_ids_session));
    const updatedSession = JSON.parse(sessionStorage.getItem('cardlist_studying'))
    console.log(updatedSession)

    //데이터 저장 후 서버에 새카드 요청
    if(this.state.contents.length === 1){
      this.getCardContentsAdd()
    }

    //this.state.contents에서 지금 공부한 카드 제거 / 다음카드로 넘어갈때 현카드 학습시간 초기화 / 카드 뒤집기를 정방향으로 되돌리기
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
    console.log('here : ',list)
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
      var id_of_content = this.state.contents[0]._id
      const card_ids_session = JSON.parse(sessionStorage.getItem('cardlist_studying'))
      const selected_content = card_ids_session.find(item => {
        if(item._id === id_of_content){
          return item
        }
      })
      var level_revealed = selected_content.detail_status.level
      var current_lev_study_times_selected = selected_content.detail_status.current_lev_study_times

      var first_face_data = this.state.contents[0].contents.face1.map(item => <FroalaEditorView key={item} model={item}/>)
      var second_face_data = this.state.contents[0].contents.face2.map(item => <FroalaEditorView key={item} model={item}/>)
      // var annotation_data = this.state.contents[0]._id.content_of_annot.map(item => <FroalaEditorView model={item}/>)
      
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
          
          // if(current_lev_study_times_selected === 0){
          //   var exp_gain = selected_card_book_level_config[0].exp_setting.one_time
          // } else if(current_lev_study_times_selected === 1){
          //   exp_gain = selected_card_book_level_config[0].exp_setting.two_times
          // } else if(current_lev_study_times_selected === 2){
          //   exp_gain = selected_card_book_level_config[0].exp_setting.three_times
          // } else if(current_lev_study_times_selected === 3){
          //   exp_gain = selected_card_book_level_config[0].exp_setting.four_times
          // } else if(current_lev_study_times_selected === 4){
          //   exp_gain = selected_card_book_level_config[0].exp_setting.five_times
          // } else if(current_lev_study_times_selected > 4){
          //   exp_gain = selected_card_book_level_config[0].exp_setting.five_times
          // }

          if(level_revealed === 0){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_0.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_0.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_0.interval)
            }
          } else if(level_revealed === 1){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_0.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_0.interval)
            }
          } else if(level_revealed === 2){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_1.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_1.interval)
            }
          } else if(level_revealed === 3){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_2.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_2.interval)
            }
          } else if(level_revealed === 4){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_3.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_3.interval)
            }
          } else if(level_revealed === 5){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_4.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_4.interval)
            }
          } else if(level_revealed === 6){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_5.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_5.interval)
            }
          } else if(level_revealed === 7){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_6.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_6.interval)
            }
          } else if(level_revealed === 8){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_7.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_7.interval)
            }
          } else if(level_revealed === 9){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_11.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_8.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_8.interval)
            }
          } else if(level_revealed === 10){
            if(current_lev_study_times_selected === 0){
              interval.push(item.lev_setting.lev_12.interval)
            } else if(current_lev_study_times_selected === 1){
              interval.push(item.lev_setting.lev_11.interval)
            } else if(current_lev_study_times_selected === 2){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 3){
              interval.push(item.lev_setting.lev_10.interval)
            } else if(current_lev_study_times_selected === 4){
              interval.push(item.lev_setting.lev_9.interval)
            } else if(current_lev_study_times_selected > 4){
              interval.push(item.lev_setting.lev_9.interval)
            }
          }


          time_unit.push(item.difficulty_setting.diffi1.time_unit)
          time_unit.push(item.difficulty_setting.diffi2.time_unit)
          time_unit.push(item.difficulty_setting.diffi3.time_unit)
          time_unit.push(item.difficulty_setting.diffi4.time_unit)
          
          if(level_revealed === 0){
            time_unit.push(item.lev_setting.lev_0.time_unit)
          } else if(level_revealed === 1){
            time_unit.push(item.lev_setting.lev_1.time_unit)
          } else if(level_revealed === 2){
            time_unit.push(item.lev_setting.lev_2.time_unit)
          } else if(level_revealed === 3){
            time_unit.push(item.lev_setting.lev_3.time_unit)
          } else if(level_revealed === 4){
            time_unit.push(item.lev_setting.lev_4.time_unit)
          } else if(level_revealed === 5){
            time_unit.push(item.lev_setting.lev_5.time_unit)
          } else if(level_revealed === 6){
            time_unit.push(item.lev_setting.lev_6.time_unit)
          } else if(level_revealed === 7){
            time_unit.push(item.lev_setting.lev_7.time_unit)
          } else if(level_revealed === 8){
            time_unit.push(item.lev_setting.lev_8.time_unit)
          } else if(level_revealed === 9){
            time_unit.push(item.lev_setting.lev_9.time_unit)
          } else if(level_revealed === 10){
            time_unit.push(item.lev_setting.lev_10.time_unit)
          }
          

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
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi1", id_of_content,book_id, interval[0], time_unit[0], level_revealed)}>{nicks[0]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[0]}{time_unit[0]})</div></Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi2", id_of_content,book_id, interval[1], time_unit[1], level_revealed)}>{nicks[1]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[1]}{time_unit[1]})</div></Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi3", id_of_content,book_id, interval[2], time_unit[2], level_revealed)}>{nicks[2]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[2]}{time_unit[2]})</div></Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi4", id_of_content,book_id, interval[3], time_unit[3], level_revealed)}>{nicks[3]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[3]}{time_unit[3]})</div></Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={()=>this.onClickDifficulty("diffi5", id_of_content,book_id, interval[4], time_unit[4], level_revealed)}>{nicks[4]}<div style={{marginTop:"-5px", fontSize:"9px"}}>({interval[4]}{time_unit[4]})</div></Button>
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