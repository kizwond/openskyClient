import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';

class SelectedIndexCardCount extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const columns = [
            {
              title: '선택된 책 권수',
              dataIndex: 'age',
              key: 'name',
              align :'center',
            },
            {
              title: '선택된 목차 수',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '학습완료울',
              dataIndex: 'age',
              key: 'address',
            },
            {
                title: '미학습카드',
                dataIndex: 'age',
                key: 'address',
              },
              {
                title: '기학습카드',
                dataIndex: 'age',
                key: 'address',
                children: [
                    {
                      title: '모든키학습카드',
                      dataIndex: 'age',
                      key: 'age',
                    },
                    {
                        title: '현시간기준',
                        dataIndex: 'age',
                        key: 'age',
                    },
                    {
                        title: '오늘기준',
                        dataIndex: 'age',
                        key: 'age',
                    },
                ]
              },
              {
                title: '완료',
                dataIndex: 'age',
                key: 'address',
              },
              {
                title: '보류',
                dataIndex: 'age',
                key: 'address',
              },
          ];
          
          const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
            },
          ];
        return (
            <Table columns={columns} 
                   pagination={false} 
                   dataSource={data} 
                   size='small'
                   />
          );
    }
}

export default SelectedIndexCardCount;