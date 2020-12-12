import React, { Component } from 'react';
import { Table, Tag, Space,Button,Avatar,Popover,Input,Checkbox,Modal } from 'antd';
import { SearchOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import axios from 'axios'

const { TextArea } = Input;


class MentoringAsk extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     };
  }

  render() {
    const content = (
      <div style={{fontSize:"11px"}}>
        <h3 style={{fontWeight:700}}>멘토 요청 정보</h3>
        <ul>
          <li>아이디 : kizwond</li> 
          <li>이름 : 윤아무개</li> 
          <li>책이름 : {this.props.book_info.book_title}</li> 
        </ul>
        <h3 style={{fontWeight:700}}>멘토정보</h3>
        <ul>
          <li>아이디 : <Input size="small" onChange={this.props.inputMentorId} value={this.props.mentor_id} style={{width:"80px"}}></Input><Button size="small" onClick={this.props.searchMentor}><SearchOutlined /></Button></li> 
          <li>소속(정보) :{this.props.mentor_info ? <span>{this.props.mentor_info.name}/{this.props.mentor_info.nickname}</span> : null} </li> 
          <li>요청 메세지 : <TextArea rows={4} onChange={this.props.msgToSend} value={this.props.msg_to_mentor}/></li> 
        </ul>
        <h3>멘토링 요청시, 멘토에게 ID, 이름, 해당 책 학습이력 정보등을 공유합니다.</h3>
        <h3>이에 동의하십니까?<Checkbox onChange={this.props.onChangeAgree}></Checkbox>네, 동의합니다.</h3>
        <div><Space><Button size="small" onClick={this.props.sendRequestMentoring} style={{width:"100px", fontSize:"11px"}}>멘토링 요청하기</Button><Button size="small" style={{width:"100px", fontSize:"11px"}}>취소</Button></Space></div>
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
          <Popover content={content} book_info={record} placement="bottomLeft" trigger="click"><Button size="small" onClick={() => this.props.saveBookInfo(record)} style={{fontSize:"11px"}}>요청하기</Button></Popover>
        ),
      },
    ];

    if(this.props.category.length > 0){
      console.log("here?")
      var plz = []
      var categoryArray = this.props.category.map(book => book.book_ids.map((item)=> plz.push(item)))

      var data = plz.map(book =>({
        key: book._id,
        book_id: book._id,
        book_title : book.title,
      }))
      console.log(data)
    }

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

