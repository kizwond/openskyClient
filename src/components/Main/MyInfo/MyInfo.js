import React, { Component } from 'react';
import { Tabs } from 'antd';
import './MyInfo.css'
import BookList from './BookList'
import ReqBookList from './ReqBookList'
import axios from 'axios'

const { TabPane } = Tabs;

class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        candibooklist:[],
     };
  }
  changeTab(key) {
    console.log(key);
  }
  componentDidMount(){
      this.showCandiBookList()
  }
  showCandiBookList = () => {
    axios.get('api/bookstore/show-candibooklist')
    .then(res => {
        console.log(res.data.candibooklist)
        this.setState({
            candibooklist:res.data.candibooklist
        })
    })
}
  render() {

    return (
        <div style={{width:"100%", marginTop:"30px"}}> 
            <Tabs  defaultActiveKey="2" onChange={this.changeTab} style={{height:"100%"}} className="my_info_tabs" tabPosition="left">
                <TabPane key="1" tab={<span>개인정보관리</span>}>
                    <div style={{fontSize:"11px"}}>
                        개인정보들
                    </div>
                </TabPane>
                <TabPane key="2" tab={<span>책판매등록</span>}>
                    <div style={{fontSize:"11px"}}>
                    <BookList showCandiBookList={this.showCandiBookList}/>
                    </div>
                </TabPane>
                <TabPane key="3" tab={<span>판매요청승인</span>}>
                    <div style={{fontSize:"11px"}}>
                    <ReqBookList candibooklist={this.state.candibooklist}/>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
  }
}

export default MyInfo;