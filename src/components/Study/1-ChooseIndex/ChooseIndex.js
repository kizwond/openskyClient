import React, { Component } from 'react';
import axios from "axios"
import {Row, Col, Tabs } from 'antd';
import BookTitleList from './BookTitleList/BookTitleList'
import "./ChooseIndex.css"
// import SelectedIndexTotal from '../2-FlipMode/SelectedIndexTotal'
import ReadModeTab from './StudyModeTab/ReadModeTab';
import FlipModeTab from './StudyModeTab/FlipModeTab';
import ExamModeTab from './StudyModeTab/ExamModeTab';

const { TabPane } = Tabs;

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
      mode: "normal",
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
      tab_mode: 'left',
      key:'0',
      expand:true,
      selected_index:[]
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
    const requestArray = value.map((item)=>{
      axios.post('api/studysetup/get-index',{
        selected_books:item
      }).then(res => {
        console.log('데이타:', res.data)
        this.setState({
          books:[...this.state.books, res.data.single_book_info]
        })
      })
    })
  }

  startStudy = () => {
    console.log("startStudy Clicked!!!!")
    // axios.post('api/studysetup/start-study',{
    //   session_id: value,
    //   study_mode:this.state.mode, 
    //   card_order: order_by,
    //   re_card_collect_criteria: reviewMode,
    //   on_off: {yet: newToggle, re:reviewToggle, hold:hold, completed:completed},
    //   num_cards:{yet:this.state.newCardNum, re:this.state.reviewCardNum, hold:this.state.holdCardNum, completed:this.state.completedCardNum},
    //   num_request_cards:2
    // }).then(window.location.href="/start-study")

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
  handleTabChange =(key) => {
    this.setState({
      key:key
    })
  }

  onFinish = (values) => {
    console.log('Success:', values);
    console.log(this.state.selected_index)

    const result = this.state.selected_index.reduce((accu, curr) => { 
      accu[curr.index_id] = (accu[curr.index_id] || 0)+1; 
      return accu;
    }, {});
    console.log(result)

  };
  getSelected = (value) => {
    console.log('selected_info', value.checkedNodes)
    const contents = this.state.selected_index.concat(value.checkedNodes)
    
    console.log("result : ",contents)
    const key = "default"
    const myArray = contents.filter(function( obj ) {
      return obj.key !== key;
    });
    console.log('myArray',myArray)
    this.setState({selected_index :myArray })
  }
  updateExpandState = () => {
    this.setState((prevState)=>({expand:!prevState.expand}))
    console.log(this.state.expand)
  }
  render() { 
    return (
      <div style={{fontSize:"12px",width:"100%", margin:"auto", height:"100%"}}>
        <Row style={{margin:"10px 0", height:"100%"}} justify="center">
          <Col className="gutter-row" style={{height:"100%", backgroundColor:"#b1c6ec"}} span={18}>
            <div style={{height:"26px", lineHeight:"26px", backgroundColor:"#b1c6ec", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>책이름 및 목차선택</div>
            <BookTitleList onClickUp={this.onClickUp} 
                           onClickDown={this.onClickDown} 
                          //  onSelect={this.onSelect} 
                           books={this.state.books}
                           expand={this.state.expand}
                           getSelected={this.getSelected}
                           updateExpandState={this.updateExpandState}/>
            {/* <div style={{background:"#5c89cf", padding:"0 10px 10px 10px", borderTop:"10px solid white"}}>
              <div style={{color:"white", height:"26px", lineHeight:"26px", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>선택된 영역에 포함된 카드의 학습 정보</div>
              <SelectedIndexTotal />
            </div> */}
          </Col>
          <Col style={{height:"100%", backgroundColor:"whitesmoke", marginLeft:"5px", display:"flex", flexDirection:"column", justifyContent:"space-between"}} span={5}>
            <Tabs className="study_mode_class" defaultActiveKey={this.state.key} onChange={this.handleTabChange} type="card" size='small' tabPosition={this.state.tab_mode} >
              <TabPane tab="책모드" key="0" style={{textAlign:"left", padding:"10px"}}>
                <ReadModeTab onFinish={this.onFinish}/>
              </TabPane>
              <TabPane tab="카드모드" key="1" style={{textAlign:"left", padding:"10px"}}>
                <FlipModeTab onFinish={this.onFinish}/>
              </TabPane>
              <TabPane tab="시험모드" key="3" style={{textAlign:"left", padding:"10px"}}>
                <ExamModeTab onFinish={this.onFinish}/>
              </TabPane>
            </Tabs>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseIndex;