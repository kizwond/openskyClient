import React, { Component } from 'react';
import axios from "axios"
import { Row, Col, Divider,Alert,Button } from 'antd';
import BookTitleList from './BookTitleList'


class ChooseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books:[],
     }
  }

  componentDidMount() {
    this.setState({
      books:[]
    })
    this.getOnlyShowTitle()
  }
  getOnlyShowTitle() {
    axios.post('api/study/get-index').then(res => {
      console.log(res.data)
      this.setState({
        books:res.data.book_and_index_list
      })
    })
  }

  render() {

    // console.log('log props:', this.props.location.selectedBook.value)
    if(this.state.books){
      console.log('length:',this.state.books.length)
      var num_books = this.state.books.length
    }
    
    const msg = `책 ${num_books}권에 목차 00개를 선택하셨습니다. 선택된 영역에서 필터링 한 결과, 신규카드 00개와 / 복습카드 00개가 있습니다.`
    return (
      <div style={{fontSize:"12px",width:"90%", margin:"auto", height:"80vh"}}>
        <Row gutter={1} style={{margin:"10px 0", height:"100%"}} justify="center">
          <Col className="gutter-row" style={{height:"100%", backgroundColor:"#b1c6ec"}} span={12}>
            <div style={{height:"26px", lineHeight:"26px", backgroundColor:"#b1c6ec", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>책이름 및 목차선택</div>
            <BookTitleList books={this.state.books}/>
          </Col>
          <Col className="gutter-row"  style={{height:"100%", backgroundColor:"#b1c6ec", marginLeft:"5px"}} span={6}>
            <div style={{height:"26px", lineHeight:"26px", backgroundColor:"#b1c6ec", textAlign:"left", paddingLeft:"10px", fontWeight:"700"}}>필터링</div>
            <div style={{height:"77vh", paddingRight:"10px", backgroundColor:"#b1c6ec"}}>
              <div style={{height:"100%", backgroundColor:"#dfecf6"}}>설정들</div>
            </div>
          </Col>
          <Col className="gutter-row" style={{height:"100%", backgroundColor:"whitesmoke", marginLeft:"5px", display:"flex", flexDirection:"column", justifyContent:"space-between"}} span={5}>
            <div><Alert message={msg} type="success" style={{backgroundColor:"#d0eaff", fontSize:"14px",border:"1px dashed #c1c1c1"}} /></div>
            <div style={{backgroundColor:"#69d316", width:"100%", height:"40px", color:"white", lineHeight:"40px", fontWeight:"700", textAlign:"left", paddingLeft:"20px"}}>보기 및 학습량 설정</div>
            <div style={{fontSize:"11px",height:"60%", textAlign:"left", padding:"10px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
              <div>
                <div>보기모드 선택</div>
                <div>
                  <ul>
                    <li>책보기 모드</li>
                    <li>플래쉬카드 모드</li>
                    <li>시험보기 모드</li>
                  </ul>
                </div>
              </div>

              <div>
                <div>카드순서 선택</div>
                <div>
                  <ul>
                    <li>기본(순서대로)</li>
                    <li>복습시점 빠른 순</li>
                    <li>랜덤</li>
                  </ul>
                </div>
              </div>

              <div>
                <div>학습량 설정</div>
                <div>
                  <ul>
                    <li>신규카드</li>
                    <li>복습카드</li>
                    <li>보류카드</li>
                    <li>완료카드</li>
                  </ul>
                </div>
              </div>
              
            </div>
            <div style={{height:"100px", backgroundColor:"#dfecf6", lineHeight:"100px"}}><Button style={{color:"white", fontWeight:"700", background:"#69d316", width:"200px", height:"50px"}}>세션 시작하기</Button></div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseIndex;