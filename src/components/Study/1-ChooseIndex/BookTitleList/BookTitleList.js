import React, { Component } from 'react';
import { Space, Tabs } from 'antd';
import "./BookTitleList.css"
import IndexTree from "./IndexTree/IndexTree"
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';
import SelectedIndexCardCount from '../../2-FlipMode/SelectedIndexCardCount'

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
          <div style={{padding:'10px', fontSize:"11px", backgroundColor:"#5c89cf", borderBottom:"10px solid #b1c6ec"}}>
            선택 영역에 포함된 카드의 학습정보 
            괄호안 숫자는 현재시각 기준으로 산출한 복습 필요 카드 수량입니다.
            <SelectedIndexCardCount books={this.props.books} />
          </div>
          <IndexTree book_id={book.book_id} 
                  //  onSelect={this.props.onSelect}
                     book={book.index_info}
                     expand={this.props.expand}
                     updateExpandState={this.props.updateExpandState}/>
      </TabPane>
      )
    return (
        <Tabs style={{height:"100%",paddingLeft:"10px"}} className="study_next_page_tabs" tabPosition="left">
          {bookList}
        </Tabs>
    );
  }
}

export default BookTitleList;