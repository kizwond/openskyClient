import React, { Component } from 'react';
import { Table, Modal, Space,Button,Avatar } from 'antd';
import { ExclamationCircleOutlined,UserOutlined} from '@ant-design/icons';
const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: '해당 요청을 취소하시겠습니까?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
    okText: '예',
    cancelText: '아니요',
  });
}


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
      <Button size="small" onClick={showConfirm} style={{fontSize:"11px"}}>요청취소</Button>
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
