import React, { Component } from 'react';
import { Card,List, Typography, Divider } from 'antd';
import axios from 'axios'

const { Meta } = Card;

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount(){
    // axios.post('api/bookstore/req-book-sell',{
    //   book_id: '',
    // }).then(res => {
    //   console.log(res.data.book_list)
    //   this.setState({
    //     book_list: res.data.book_list
    //   })
    // })
  }
  onClickBook = () =>{
    console.log("book clicked")
  }
  onClickCategory = (item) =>{
    console.log(`${item} clicked`)
  }
  render() {
    const data = [
      '카테고리1',
      '카테고리2',
      '카테고리3',
      '카테고리4',
      '카테고리5',
      '카테고리6',
      '카테고리7',
      '카테고리8',
      '카테고리9',

    ];

    // const book_list = this.state.book_list.map(book =>{
    //   return (
    //       <Card
    //         hoverable
    //         style={{ width: 240 }}
    //         cover={<img alt="example" src="" />}
    //       >
    //         <Meta title={book.title} description={book.description}/>
    //       </Card>
    //   )
    // })
    return (
      <div className="store_page_container" style={{display:"flex", flexDirection:"row", marginTop:"20px"}}>
        <div style={{width:"200px"}}>
          <List
            size="small"
            header={<div>카테고리</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item><span style={{cursor:"pointer"}} onClick={() =>this.onClickCategory(item)}>{item}</span></List.Item>}
          />
        </div>
        <div>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="책표지 썸네일" src="" width="200px"/>}
            onClick={this.onClickBook}
          >
            <Meta title="책제목" description="책설명"/>
          </Card>
          {/* {book_list} */}
        </div>
      </div>
    );
  }
}

export default Store;