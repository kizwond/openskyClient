import React, { Component } from 'react';
import { Space, Tabs, Radio } from 'antd';
import "./BookTitleList.css"
import IndexTree from "./IndexTree"
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';
import axios from 'axios';
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
          {book.book.title}/{book.book.title}
          <ArrowUpOutlined onClick={()=>this.props.onClickUp(book.book._id)}/>
          <ArrowDownOutlined onClick={()=>this.props.onClickDown(book.book._id)}/>
          </Space>
        </span>
        } key={book.book._id}>
        <IndexTree onSelect={this.props.onSelect} book_id={book.book._id} book={book.index}/>
      </TabPane>
      )
    return (
        <Tabs style={{height:"96%",paddingLeft:"10px"}} className="study_next_page_tabs" tabPosition="left">
          {bookList}
        </Tabs>
    );
  }
}

export default BookTitleList;