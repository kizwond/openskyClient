import React, { Component } from 'react';
import { List } from 'antd';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     };
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

    return (

        <List
            size="small"
            header={<div>카테고리</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item><span style={{cursor:"pointer"}} onClick={() =>this.onClickCategory(item)}>{item}</span></List.Item>}
          />
    );
  }
}

export default Store;