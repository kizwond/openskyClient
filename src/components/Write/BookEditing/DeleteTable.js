import React, { Component } from 'react'

import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
const { confirm } = Modal;


class DeleteTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }
  
  deleteThis = (value) => {
    this.props.tableDeleteHandler({value, bookId:this.props.table.book_id, tableId:this.props.table._id, seq:this.props.table.seq, level:this.props.table.level})
  }
  showPromiseConfirm = (table, event) => {
    console.log(this)
    confirm({
      title: [`[${this.props.table.name}] 목차를 삭제하시겠습니까?`],
      okText: '삭제',
      cancelText: '취소',
      icon: <ExclamationCircleOutlined />,
      content: [],
      onOk() {  
        event({tableId:table._id})
      },
      onCancel() { },
    });
  }
  render() { 
    return ( 
      <Space>
        <DeleteOutlined onClick={()=>this.showPromiseConfirm(this.props.table, this.deleteThis)} style={{fontSize:'14px'}} />
      </Space>
    );
  }
}



export default DeleteTable