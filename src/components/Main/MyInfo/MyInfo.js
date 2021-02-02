import React, { Component } from 'react';
import { Space, Tabs, Button } from 'antd';
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';
import './MyInfo.css'
import BookList from './BookList'

const { TabPane } = Tabs;

class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        key:'1'
     };
  }
  changeTab(key) {
    console.log(key);
  }
  render() {

    return (
        <div style={{width:"100%", marginTop:"30px"}}> 
            <Tabs  defaultActiveKey="1" onChange={this.changeTab} style={{height:"100%"}} className="my_info_tabs" tabPosition="left">
                <TabPane key="1" tab={<span>개인정보관리</span>}>
                    <div style={{fontSize:"11px"}}>
                        개인정보들
                    </div>
                </TabPane>
                <TabPane key="2" tab={<span>책판매등록</span>}>
                    <div style={{fontSize:"11px"}}>
                    <BookList/>
                    </div>
                </TabPane>
                <TabPane key="3" tab={<span>판매요청승인</span>}>
                    <div style={{fontSize:"11px"}}>
                        판매요청승인
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
  }
}

export default MyInfo;