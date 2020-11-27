import React, { Component } from 'react';
import { Tabs, Radio, Space } from 'antd';
import "./BookTitleList.css"

const { TabPane } = Tabs;

class BookTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const bookList = this.props.books.map((book)=> 
      <TabPane tab={book.book.title} key={book.book._id}>
        {book.index[0].name}
      </TabPane>)
    return (
        <Tabs tabPosition="left">
          {bookList}
        </Tabs>
    );
  }
}

export default BookTitleList;