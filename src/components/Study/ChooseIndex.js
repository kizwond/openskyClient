import React, { Component } from 'react';
import axios from "axios"
import { Radio,Row, Col,Button,Switch } from 'antd';
import BookTitleList from './BookTitleList'
import StudyMode from './StudyMode'
import StudyFiltering from './StudyFiltering';
import { RedoOutlined, FileOutlined } from '@ant-design/icons';
import SelectedIndexTotal from './SelectedIndexTotal'

class ChooseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books:[],
      book_and_index_ids:[],
      num_new:0,
      num_need_study:0,
      num_total:0,
      selected_index_num : 0,
      mode: "read",
      order:"normal",
      reviewDetail:"all",
      reviewDetailDetail:"now",
      reviewToggle:true,
      newToggle:true,
      newCardNum:0,
      reviewCardNum:0,
      visible: false,
      hold:false,
      completed:false,
      holdCardNum:0,
      completedCardNum:0,
     }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    console.log("ok clicked")
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    // const value = sessionStorage.getItem("session_id")
    const value = JSON.parse(sessionStorage.getItem("book_ids"))
    console.log('sessionstorage',value)
    const requestArray = value.map((item)=>{
      axios.post('api/studysetup/get-index',{
        selected_books:item
      }).then(res => {
        console.log('데이타:', res.data)
        this.setState({
          books:[...this.state.books, res.data.single_book_info]
        })
      })
    return null
    })
    console.log(requestArray)
  }

  startStudy = () => {
    const value = sessionStorage.getItem("session_id")
    if(this.state.reviewDetail === "all"){
      var reviewMode = "all"
    } else if(this.state.reviewDetail === "review"){
      if(this.state.reviewDetailDetail === "now"){
        reviewMode = "now"
      } else {
        reviewMode = "today"
      }
    }
    if(this.state.order === "normal"){
      var order_by = "sort_by_index"
    } else if(this.state.order === "review"){
      order_by = "sort_by_restudytime"
    } else if(this.state.order === "random"){
      order_by = "random"
    }
    if(this.state.newToggle === true){
      var newToggle = "on"
    } else {
      newToggle = "off"
    }
    if(this.state.reviewToggle === true){
      var reviewToggle = "on"
    } else {
      reviewToggle = "off"
    }
    if(this.state.hold === true){
      var hold = "on"
    } else {
      hold = "off"
    }
    if(this.state.completed === true){
      var completed = "on"
    } else {
      completed = "off"
    }

    console.log("session_id : ", value)
    console.log("study_mode : ", this.state.mode)
    console.log("card_order : ", order_by)
    console.log("re_card_collect_criteria : ", reviewMode)
    console.log("on_off : ", {yet: newToggle, re:reviewToggle, hold:hold, completed:completed})
    console.log("num_cards : ", {yet:this.state.newCardNum, re:this.state.reviewCardNum, hold:this.state.holdCardNum, completed:this.state.completedCardNum})

    // const study_setting = {
    //   session_id: value,
    //   study_mode:this.state.mode, 
    //   card_order: order_by,
    //   re_card_collect_criteria: reviewMode,
    //   on_off: {yet: newToggle, re:reviewToggle, hold:hold, completed:completed},
    //   num_cards:{yet:this.state.newCardNum, re:this.state.reviewCardNum, hold:this.state.holdCardNum, completed:this.state.completedCardNum},
    //   num_request_cards:2
    // }

    axios.post('api/studysetup/start-study',{
      session_id: value,
      study_mode:this.state.mode, 
      card_order: order_by,
      re_card_collect_criteria: reviewMode,
      on_off: {yet: newToggle, re:reviewToggle, hold:hold, completed:completed},
      num_cards:{yet:this.state.newCardNum, re:this.state.reviewCardNum, hold:this.state.holdCardNum, completed:this.state.completedCardNum},
      num_request_cards:2
    }).then(window.location.href="/start-study")

    
    // sessionStorage.setItem('study_setting',JSON.stringify(study_setting));
    // // console.log('data:', JSON.parse(sessionStorage.getItem('study_setting')))
    // window.location.href="/start-study"
  }
  
  onChangeNewCardNum = (e) =>{
    console.log(e.target.value)
    this.setState({
      newCardNum : e.target.value
    })
  }
  onChangeReviewCardNum = (e) =>{
    console.log(e.target.value)
    this.setState({
      reviewCardNum : e.target.value
    })
  }
  onSelect = (selectedKeys, info) => {
    console.log(info)
    if(info.selected === true){
      var index_id = info.node.index_id
      var book_id = info.node.book_id
      var status = true
      this.setState( prevState =>({
        selected_index_num : prevState.selected_index_num + 1})
      )
    } else {
      index_id = info.node.index_id
      book_id = info.node.book_id
      status = false
      this.setState( prevState =>({
        selected_index_num : prevState.selected_index_num - 1})
      )
    }
    const session_id = sessionStorage.getItem("session_id")
    console.log(index_id, book_id, status)
    axios.post('api/studysetup/click-index',{
      index_id: index_id,
      book_id: book_id,
      session_id:session_id,
      status: status
    }).then(res=>{
      console.log(res)
      this.setState( {
        num_new : res.data.num_total_cards.yet,
        num_need_study : res.data.num_total_cards.re,
        num_total : res.data.num_total_cards.total
        }
      )
    })
  }

  onChangeMode = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      mode: e.target.value,
    });
  };

  onChangeOrder = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      order: e.target.value,
    });
  };

  onClickUp = (value) => {
    console.log(value)
    const session_id = sessionStorage.getItem("session_id")
    axios.post('api/studysetup/click-up',{
      book_id: value,
      session_id: session_id,
      status: 'up'
    }).then(res=>{
      console.log(res)
      this.setState( {
        books:res.data.booksnindexes
        }
      )
    })
  }
  onClickDown = (value) => {
    console.log(value)
    const session_id = sessionStorage.getItem("session_id")
    axios.post('api/studysetup/click-down',{
      book_id: value,
      session_id: session_id,
      status: 'down'
    }).then(res=>{
      console.log(res)
      this.setState( {
        books:res.data.booksnindexes
        }
      )
    })
  }
  
  onChangeNew = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      newToggle:checked
    })
  }
  onChangeReview = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      reviewToggle:checked
    })
  }
  onChangeHold = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      hold:checked
    })
  }
  onChangeCompleted = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({
      completed:checked
    })
  }
  onChangeReviewDetail = (checked) => {
    console.log(`switch to ${checked}`);
    console.log(checked.target.value)
    this.setState({
      reviewDetail:checked.target.value
    })
  }
  onChangeReviewDetailDetail = (checked) => {
    console.log(`switch to ${checked}`);
    console.log(checked.target.value)
    this.setState({
      reviewDetailDetail:checked.target.value
    })
  }
  onChangeHoldCardNum = (e) => {
    this.setState({
      holdCardNum:e.target.value
    })
  }
  onChangeCompletedCardNum = (e) => {
    this.setState({
      completedCardNum:e.target.value
    })
  }
  render() {
    
    var radioStyle1 = {
      display: 'block',
      fontSize:'12px',
      marginTop:'5px'
    };
    var radioStyle2 = {
      display: 'block',
      fontSize:'12px',
      marginTop:'5px'
    };

    if(this.state.order === "normal"){
      var radioStyleNormal = radioStyle2
      var radioStyleReview = radioStyle1
      var radioStyleRandom = radioStyle1
    } else if(this.state.order === "review"){
      radioStyleNormal = radioStyle1
      radioStyleReview = radioStyle2
      radioStyleRandom = radioStyle1
    } else if(this.state.order === "random"){
      radioStyleNormal = radioStyle1
      radioStyleReview = radioStyle1
      radioStyleRandom = radioStyle2
    }
    
    return (
      <div style={{fontSize:"12px",width:"90%", margin:"auto", height:"80vh"}}>
        <Row gutter={1} style={{margin:"10px 0", height:"100%"}} justify="center">
          <Col className="gutter-row" style={{height:"100%", backgroundColor:"#b1c6ec"}} span={18}>
            <div style={{height:"26px", lineHeight:"26px", backgroundColor:"#b1c6ec", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>책이름 및 목차선택</div>
            <BookTitleList onClickUp={this.onClickUp} onClickDown={this.onClickDown} onSelect={this.onSelect} books={this.state.books}/>
            <div style={{background:"#5c89cf", padding:"0 10px 10px 10px", borderTop:"10px solid white"}}>
              <div style={{color:"white", height:"26px", lineHeight:"26px", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>선택된 영역에 포함된 카드의 학습 정보</div>
              <SelectedIndexTotal />
            </div>
            
          </Col>
          <Col className="gutter-row" style={{height:"103.7%", backgroundColor:"whitesmoke", marginLeft:"5px", display:"flex", flexDirection:"column", justifyContent:"space-between"}} span={5}>
            <div style={{fontSize:"11px",textAlign:"left", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
 
                <div>
                  <div style={{backgroundColor:"#69d316", width:"100%", height:"40px", color:"white", lineHeight:"40px", fontWeight:"700", textAlign:"left", paddingLeft:"20px"}}>보기모드 및 카드타입 선택</div>
                  <Radio.Group onChange={this.onChangeMode} value={this.state.mode}>
                    <Radio style={radioStyle1} value="read">
                      책보기 모드
                    </Radio>
                    <Radio style={radioStyle1} value="flip">
                      카드 뒤집기 모드
                      <div style={{marginLeft:"20px"}}><FileOutlined /> 읽기카드 <Switch size="small" onChange={this.props.onChangeNew} checked={this.props.newToggle}/></div>
                      <div style={{marginLeft:"20px"}}><RedoOutlined /> 뒤집기카드 <Switch size="small" onChange={this.props.onChangeNew} checked={this.props.newToggle}/></div>
                    </Radio>
                    <Radio style={radioStyle1} value="exam">
                      시험보기 모드
                      <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"20px"}}>※ 시험보기 모드에서는 뒤집기 카드만 출제 가능합니다.</div>
                    </Radio>
                  </Radio.Group>
                </div>
                
                <div style={{height:"413px"}}>
                  <div style={{backgroundColor:"#69d316", width:"100%", height:"40px", color:"white", lineHeight:"40px", fontWeight:"700", textAlign:"left", paddingLeft:"20px"}}>카드순서 선택 및 학습량 설정</div>
                  <Radio.Group onChange={this.onChangeOrder} value={this.state.order}>
                    <Radio style={radioStyleNormal} value="normal">
                      기본(순서대로)
                      
                      {this.state.order === "normal" ? 
                      <>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"20px"}}>※ 원래 순서대로 표시됩니다. 목차 기능을 사용할 수 있습니다.</div>
                        <StudyMode onChangeNew={this.onChangeNew}
                                  newToggle={this.state.newToggle}
                                  onChangeNewCardNum={this.onChangeNewCardNum}
                                  newCardNum={this.state.newCardNum}
                                  onChangeReview={this.onChangeReview}
                                  reviewToggle={this.state.reviewToggle}
                                  onChangeReviewCardNum={this.onChangeReviewCardNum}
                                  reviewCardNum={this.state.reviewCardNum}
                                  onChangeReviewDetail={this.onChangeReviewDetail}
                                  reviewDetail={this.state.reviewDetail}
                                  onChangeReviewDetailDetail={this.onChangeReviewDetailDetail}
                                  reviewDetailDetail={this.state.reviewDetailDetail}
                                  onChangeHold={this.onChangeHold}
                                  hold={this.state.hold}
                                  completed={this.state.completed}
                                  onChangeCompleted={this.onChangeCompleted}
                                  onChangeHoldCardNum={this.onChangeHoldCardNum}
                                  onChangeCompletedCardNum={this.onChangeCompletedCardNum}            
                        /> 
                      </>: null}
                    </Radio>
                    
                    <Radio style={radioStyleReview} value="review">
                      복습시점 빠른 순서로
                      
                      {this.state.order === "review" ? 
                      <>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"20px"}}>※ 복습 시점이 빠른카드 순으로 표시됩니다.</div>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"30px"}}>복습시점이 없는 카드(미학습카드, 완료카드, 보류카드)는</div>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"30px"}}>기학습카드 뒤로 배치됩니다.</div>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"20px"}}>※ 목차 기능이 비활성화 됩니다.</div>
                        <StudyMode onChangeNew={this.onChangeNew}
                                  newToggle={this.state.newToggle}
                                  onChangeNewCardNum={this.onChangeNewCardNum}
                                  newCardNum={this.state.newCardNum}
                                  onChangeReview={this.onChangeReview}
                                  reviewToggle={this.state.reviewToggle}
                                  onChangeReviewCardNum={this.onChangeReviewCardNum}
                                  reviewCardNum={this.state.reviewCardNum}
                                  onChangeReviewDetail={this.onChangeReviewDetail}
                                  reviewDetail={this.state.reviewDetail}
                                  onChangeReviewDetailDetail={this.onChangeReviewDetailDetail}
                                  reviewDetailDetail={this.state.reviewDetailDetail}
                                  onChangeHold={this.onChangeHold}
                                  hold={this.state.hold}
                                  completed={this.state.completed}
                                  onChangeCompleted={this.onChangeCompleted}    
                                  onChangeHoldCardNum={this.onChangeHoldCardNum}
                                  onChangeCompletedCardNum={this.onChangeCompletedCardNum}              
                        />
                      </> : null}
                    </Radio>

                    <Radio style={radioStyleRandom} value="random">
                      랜덤하게
                      
                      {this.state.order === "random" ? 
                      <>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"20px"}}>※ 카드의 종류 및 상태와 상관없이 모든 카드의 순서를 섞습니다.</div>
                        <div style={{fontStyle:"italic", fontSize:"10px", marginLeft:"20px"}}>※ 목차 기능이 비활성화 됩니다.</div>
                        <StudyMode onChangeNew={this.onChangeNew}
                                  newToggle={this.state.newToggle}
                                  onChangeNewCardNum={this.onChangeNewCardNum}
                                  newCardNum={this.state.newCardNum}
                                  onChangeReview={this.onChangeReview}
                                  reviewToggle={this.state.reviewToggle}
                                  onChangeReviewCardNum={this.onChangeReviewCardNum}
                                  reviewCardNum={this.state.reviewCardNum}
                                  onChangeReviewDetail={this.onChangeReviewDetail}
                                  reviewDetail={this.state.reviewDetail}
                                  onChangeReviewDetailDetail={this.onChangeReviewDetailDetail}
                                  reviewDetailDetail={this.state.reviewDetailDetail}
                                  onChangeHold={this.onChangeHold}
                                  hold={this.state.hold}
                                  completed={this.state.completed}
                                  onChangeCompleted={this.onChangeCompleted}
                                  onChangeHoldCardNum={this.onChangeHoldCardNum}
                                  onChangeCompletedCardNum={this.onChangeCompletedCardNum}                  
                        /> 
                      </>: null}
                    </Radio>
                  </Radio.Group>
                </div>

                
              <div>
                <Button size="small" style={{fontSize:"11px"}} onClick={this.showModal}>고급 필터 사용하기</Button>
                <StudyFiltering visible={this.state.visible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
              </div>

              
            </div>
            
            <div style={{height:"100px", backgroundColor:"#dfecf6", lineHeight:"100px"}}><Button onClick={this.startStudy} style={{color:"white", fontWeight:"700", background:"#69d316", width:"200px", height:"50px"}}>세션 시작하기</Button></div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseIndex;