import React, { Component } from 'react';
import {Modal} from 'antd'

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
    return (
      <>
      <Modal
        title="상세보기"
        width={800}
        visible={turn_on_modal}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >

        <div className="study_setting_container" style={{width:"800px"}}>
        <pre><code style={{fontSize:"10px"}}> {book_status} </code></pre>
        </div>
      </Modal>
      </>
    );
  }
}

export default StudySettingModal;

