import React, { Component } from 'react';
import { Table, Tag, Space,Button,Avatar,Popover,Input,Checkbox,Modal } from 'antd';
import { SearchOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const { TextArea } = Input;
const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


class MentoringAsk extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }
  render() {
    const content = (
      <div style={{fontSize:"11px"}}>
        <h3 style={{fontWeight:700}}>멘토 요청 정보</h3>
        <ul>
          <li>아이디 : kizwond</li> 
          <li>이름 : 윤아무개</li> 
          <li>책이름 : 한국사 요약</li> 
        </ul>
        <h3 style={{fontWeight:700}}>멘토정보</h3>
        <ul>
          <li>아이디 : <Input size="small" style={{width:"80px"}}></Input><Button size="small"><SearchOutlined /></Button></li> 
          <li>소속(정보) : 신논현역 오픈스카이 입시학원 원장</li> 
          <li>요청 메세지 : <TextArea rows={4} /></li> 
        </ul>
        <h3>멘토링 요청시, 멘토에게 ID, 이름, 해당 책 학습이력 정보등을 공유합니다.</h3>
        <h3>이에 동의하십니까?<Checkbox onChange={this.onChange}></Checkbox>네, 동의합니다.</h3>
        <div><Space><Button size="small" style={{width:"100px", fontSize:"11px"}}>멘토링 요청하기</Button><Button size="small" style={{width:"100px", fontSize:"11px"}}>취소</Button></Space></div>
      </div>
    );

    const columns = [
      {
        title: '책',
        dataIndex: 'book_title',
        render: text => text,
      },
      {
        render: (text, record) => (
          <span></span>
        ),
      },
      {
        render: (text, record) => (
          <span></span>
        ),
      },
      {
        render: (text, record) => (
          <Popover content={content} placement="bottomLeft" trigger="click"><Button size="small" style={{fontSize:"11px"}}>요청하기</Button></Popover>
        ),
      },
    ];
    const data = [
      {
        key: '1',
        book_title:"한국사 요약",
      }
    ];
    return (
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
  }
}

export default MentoringAsk;

