import React, { Component } from 'react';
import { Modal } from 'antd';
import DefaultButton from '../../../styledComponents/defaultButton'

class NewPageTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible:false,
     };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <DefaultButton size={'small'} onClick={this.showModal} >새 페이지 템플릿 추가</DefaultButton>
        <Modal
          title="새 페이지 템플릿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='만들기'
          cancelText='취소'
          maskClosable={false}
        >
          페이지 템플릿 블라블라...
        </Modal>
      </>
    );
  }
}

export default NewPageTemplete;