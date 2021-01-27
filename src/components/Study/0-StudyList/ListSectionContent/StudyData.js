import React, { Component } from 'react';
import {Modal,Table, Tag, Space} from 'antd'

class StudySettingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    if(this.props.info.book_id){
      var turn_on_modal = this.props.isModalVisible.studyDataVisible
      console.log('turn_on_modal',turn_on_modal)
      // var book_status = JSON.stringify(this.props.book_status, null, 2)
      var book_status = JSON.stringify(this.props.book_status.cards,undefined,4)
      // document.getElementById("show_data").textContent = JSON.stringify(this.props.book_status.cards, undefined, 2);
    }

    console.log("info", this.props.book_status)

    const columns = [
      {
        title: 'Card ID',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '학습상태',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Card Type',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '최근학습시간',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '다음복습시간',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '마지막선택난이도',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '총학습횟수',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '알겠음이후 학습횟수',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '총학습시간',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '최근학습시간',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '획득경험치',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '누적경험치',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '현재레벨',
        dataIndex: 'address',
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
      <>
      <Modal
        title="상세보기"
        width={1000}
        visible={turn_on_modal}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >

        <div className="study_setting_container" style={{width:"800px"}}>
        <Table columns={columns} dataSource={data} />
        <pre><code style={{fontSize:"10px"}}> {book_status} </code></pre>
        </div>
      </Modal>
      </>
    );
  }
}

export default StudySettingModal;

