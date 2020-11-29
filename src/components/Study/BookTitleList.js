import React, { Component } from 'react';
import { Tabs, Radio, Space } from 'antd';
import "./BookTitleList.css"
import IndexTree from "./IndexTree"

const { TabPane } = Tabs;

class BookTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const bookList = this.props.books.map((book)=> 
      <TabPane tab={book.book.title} key={book.book._id}>
        <IndexTree onSelect={this.props.onSelect} book={book.index}/>
      </TabPane>)
    return (
        <Tabs style={{height:"96%",paddingLeft:"10px"}} className="study_next_page_tabs" tabPosition="left">
          {bookList}
        </Tabs>
    );
  }
}

export default BookTitleList;