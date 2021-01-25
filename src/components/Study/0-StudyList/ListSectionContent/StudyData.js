import React, { Component } from 'react';
import {Modal} from 'antd'

class StudySettingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    if(this.props.info.book_id === this.props.studySetting.book_id){
      var turn_on = this.props.isModalVisible.studyDataVisible
      // var book_status = JSON.stringify(this.props.book_status, null, 2)
      var book_status = JSON.stringify(this.props.book_status.cards,undefined,4)
    }

    console.log("info", this.props.book_status)
    return (
      <>
      <Modal
        title="상세보기"
        width={800}
        visible={turn_on}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >

        <div className="study_setting_container" style={{width:"800px"}}>
          <div>{book_status}</div>
        </div>
      </Modal>
      </>
    );
  }
}

export default StudySettingModal;

