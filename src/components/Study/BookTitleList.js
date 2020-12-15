import React, { Component } from 'react';
import { Space, Tabs, Radio } from 'antd';
import "./BookTitleList.css"
import IndexTree from "./IndexTree"
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';
import axios from 'axios';
import SelectedIndexCardCount from './SelectedIndexCardCount'
const { TabPane } = Tabs;

class BookTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  
  render() {
    console.log('from :', this.props.books)
    const bookList = this.props.books.map((book)=> 
      <TabPane tab={
        <span>
          <Space>
          {book.title}
          <ArrowUpOutlined onClick={()=>this.props.onClickUp(book.book_id)}/>
          <ArrowDownOutlined onClick={()=>this.props.onClickDown(book.book_id)}/>
          </Space>
        </span>
        } key={book.book_id}>
          <div style={{fontSize:"10px",background:"#dfecf6",padding:"0 5px 0 10px",display:"flex", flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
            <span style={{textAlign:"left",width:"77%"}}>목차</span>
            <span style={{textAlign:"center",width:"80px"}}>학습완료율</span>
            <span style={{width:"60px"}}>필터된<br/>신규카드</span>
            <span style={{width:"60px"}}>필터된<br/>복습카드</span>
          </div>
          <div><SelectedIndexCardCount /></div>
        <IndexTree onSelect={this.props.onSelect} book_id={book.book_id} book={book.index_ids}/>
      </TabPane>
      )
    return (
        <Tabs style={{height:"80%",paddingLeft:"10px"}} className="study_next_page_tabs" tabPosition="left">
          {bookList}
        </Tabs>
    );
  }
}

export default BookTitleList;