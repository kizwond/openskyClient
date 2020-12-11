import React, { Component } from 'react';
import { Table, Tag, Space,Button,Avatar } from 'antd';
import { ApiOutlined,UserOutlined} from '@ant-design/icons';

const columns = [
  {
    title: '책',
    dataIndex: 'book_title',
    render: text => text,
  },
  {
    title: '요청상대',
    dataIndex: 'name',
    render: (text) => <><Avatar size={15} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {text}</>
  },
  {
    title: '요청날짜',
    dataIndex: 'ask_data',
  },
  {
    render: (text, record) => (
      <Button size="small" style={{fontSize:"11px"}}>요청취소</Button>
    ),
  },
];

const data = [
  {
    key: '1',
    book_title:"한국사 요약",
    name: 'John Brown',
    ask_data: '2020-12-25',
  }
];

const MentoringWaiting = () => {

  return (
    // style={{maxHeight:"150px", overflow:"auto"}}
    <div >
      <Table
        className='study_table_list'
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
      />
    </div>
  );
};

export default MentoringWaiting
