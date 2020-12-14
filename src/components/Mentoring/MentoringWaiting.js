import React, { Component } from 'react';
import { Table, Modal, Space,Button,Avatar } from 'antd';
import { ExclamationCircleOutlined,UserOutlined,LinkOutlined} from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal;

class MentoringWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    // function showConfirm() {
    //   confirm({
    //     title: '해당 요청을 취소하시겠습니까?',
    //     icon: <ExclamationCircleOutlined />,
    //     content: 'Some descriptions',
    //     onOk() {
    //       console.log('OK');
    //     },
    //     onCancel() {
    //       console.log('Cancel');
    //     },
    //     okText: '예',
    //     cancelText: '아니요',
    //   });
    // }

    function showConfirm(id, event) {
      confirm({
        title: '해당 요청을 취소하시겠습니까?',
        icon:<LinkOutlined />,
        content: 'Some descriptions',
        onOk() {
          console.log('OK');
          axios.post('api/mentoring/cancel-mentoring-req',{
            mentoring_req_id: id
          })
          .then(res => {
            console.log(res.data)
            event(res.data.mentoring_req)
          })
        },
        onCancel() {
          console.log('Cancel');
        },
        okText: '예',
        cancelText: '아니요',
      });
    }

    if(this.props.mentoring_req.length > 0){
      console.log("here?")
    
      var data = this.props.mentoring_req.map(book =>({
        key: book._id,
        name: book.mentor_id,
        book_title : book.title,
        ask_data: book.time_created
      }))
      console.log(data)
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
          <Button size="small" onClick={() => showConfirm(record.mentoring_id, this.props.updateRequestList)} style={{fontSize:"11px"}}>거절</Button>
        ),
      },
    ];
    
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
  }
}
 
export default MentoringWaiting;

