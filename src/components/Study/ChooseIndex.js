import React, { Component } from 'react';
import axios from "axios"
import { Radio,Row, Col, Divider,Alert,Button,Switch,Input } from 'antd';
import BookTitleList from './BookTitleList'


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
      order:"normal"
     }
  }

  componentDidMount() {
    // this.setState({
    //   books:[]
    // })
    this.getIndex()
  }
  getIndex() {
    axios.post('api/study/get-index').then(res => {
      console.log(res.data)
      this.setState({
        books:res.data.book_and_index_list
      })
    })
  }
  startStudy = () => {
    console.log("start!!!!!!")
  }
  // onSelect = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  //   const index_ids = info.selectedNodes.map(item => item.index_id)
  //   this.setState({
  //     book_and_index_ids:[...this.state.book_and_index_ids, index_ids]
  //   })
  // };

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
      var index_id = info.node.index_id
      var book_id = info.node.book_id
      var status = false
      this.setState( prevState =>({
        selected_index_num : prevState.selected_index_num - 1})
      )
    }
    
    console.log(index_id, book_id, status)
    axios.post('api/study/click-index',{
      index_id: index_id,
      book_id: book_id,
      status: status
    }).then(res=>{
      console.log(res)
      this.setState( {
        num_new : res.data.num_card.num_new,
        num_need_study : res.data.num_card.num_need_study,
        num_total : res.data.num_card.num_total
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
    axios.post('api/study/click-up',{
      book_id: value,
      status: 'up'
    }).then(res=>{
      console.log(res)
      this.setState( {
        books:res.data.book_and_index_list
        }
      )
    })
  }
  onClickDown = (value) => {
    console.log(value)
    axios.post('api/study/click-down',{
      book_id: value,
      status: 'down'
    }).then(res=>{
      console.log(res)
      this.setState( {
        books:res.data.book_and_index_list
        }
      )
    })
  }

  onChangeNew = (checked) => {
    console.log(`switch to ${checked}`);
  }
  onChangeReview = (checked) => {
    console.log(`switch to ${checked}`);
  }
  onChangeHold = (checked) => {
    console.log(`switch to ${checked}`);
  }
  onChangeCompleted = (checked) => {
    console.log(`switch to ${checked}`);
  }
  render() {

    // console.log('log props:', this.props.location.selectedBook.value)
    if(this.state.books){
      console.log('length:',this.state.books.length)
      var num_books = this.state.books.length
    }
    if(this.state.book_and_index_ids){
      console.log("selected :", this.state.book_and_index_ids)
    }
    if(this.state.selected_index_num){
      console.log(this.state.selected_index_num)
    }
    
    const radioStyle = {
      display: 'block',
      height: '20px',
      fontSize:'12px',
      marginTop:'5px'
    };
    return (
      <div style={{fontSize:"12px",width:"90%", margin:"auto", height:"80vh"}}>
        <Row gutter={1} style={{margin:"10px 0", height:"100%"}} justify="center">
          <Col className="gutter-row" style={{height:"100%", backgroundColor:"#b1c6ec"}} span={18}>
            <div style={{height:"26px", lineHeight:"26px", backgroundColor:"#b1c6ec", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>책이름 및 목차선택</div>
            <BookTitleList onClickUp={this.onClickUp} onClickDown={this.onClickDown} onSelect={this.onSelect} books={this.state.books}/>
            <div style={{marginTop:"-40px",float: "right", marginRight: "10px"}}><Button>필터설정</Button></div>
          </Col>
          <Col className="gutter-row" style={{height:"100%", backgroundColor:"whitesmoke", marginLeft:"5px", display:"flex", flexDirection:"column", justifyContent:"space-between"}} span={5}>
            <div style={{fontSize:"12px",border:"1px dashed lightgrey", background:"#dfecf6", height:"100px", lineHeight:"30px"}}>책 
              <span style={{fontWeight:"700", color:"blue"}}>{num_books}</span>권에 목차 
              <span style={{fontWeight:"700", color:"blue"}}>{this.state.selected_index_num}</span>
              개를 선택하셨습니다.<br/> 선택된 영역에서 필터링 한 결과,<br/> 신규카드 
              <span style={{fontWeight:"700", color:"blue"}}>{this.state.num_new}</span>개와 / 복습카드 
              <span style={{fontWeight:"700", color:"blue"}}>{this.state.num_need_study}</span>개가 있습니다.</div>
            <div style={{backgroundColor:"#69d316", width:"100%", height:"40px", color:"white", lineHeight:"40px", fontWeight:"700", textAlign:"left", paddingLeft:"20px"}}>보기 및 학습량 설정</div>
            <div style={{fontSize:"11px",height:"60%", textAlign:"left", padding:"10px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
 
                <div>
                  <div>보기모드 선택</div>
                  <Radio.Group onChange={this.onChangeMode} value={this.state.mode}>
                    <Radio style={radioStyle} value="read">
                      책보기 모드
                    </Radio>
                    <Radio style={radioStyle} value="flip">
                      플래쉬카드 모드
                    </Radio>
                    <Radio style={radioStyle} value="exam">
                      시험보기 모드
                    </Radio>
                  </Radio.Group>
                </div>
                
                <div>
                  <div>카드순서 선택</div>
                  <Radio.Group onChange={this.onChangeOrder} value={this.state.order}>
                    <Radio style={radioStyle} value="normal">
                      기본(순서대로)
                    </Radio>
                    <Radio style={radioStyle} value="review">
                      복습시점 빠른 순
                    </Radio>
                    <Radio style={radioStyle} value="random">
                      랜덤
                    </Radio>
                  </Radio.Group>
                </div>

                <div>
                  <div>학습량 설정</div>
                  <ul>
                    <li>신규카드<Switch size="small" defaultChecked onChange={this.onChangeNew} /> <Input style={{width:"70px"}} size="small" type="number" /></li>
                    <li>복습카드<Switch size="small" defaultChecked onChange={this.onChangeReview} /> <Input style={{width:"70px"}} size="small" type="number" /></li>
                    <li>보류카드<Switch size="small" onChange={this.onChangeHold} /></li>
                    <li>완료카드<Switch size="small" onChange={this.onChangeCompleted} /></li>
                  </ul>
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