import React, { Component } from 'react';
import { Button, Tooltip, Modal, Input, Radio, Divider } from 'antd';
import axios from 'axios'
import { QuestionCircleOutlined } from '@ant-design/icons';

class NewCardTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible:false,
      defaultValue:'read',
      radioValue:''
     };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  addCardType =(value) => {
    console.log(value)
    axios.post('api/cardtype/create-cardtype',{
      type: value.card_type,
      nick: value.card_nick,
      importance: value.card_star,
      face1: value.face_1,
      face2: value.face_2,
      face3: value.face_3,
      annotation: value.annotation,
      annot: value.annotationNum,
    }).then(res => {
      console.log(res.data)
      this.props.updateCardTypeState(res.data.cardtypes)
    })
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      fontSize:"11px",
      alignItems:"center",
      top:"2px"
    };
    
    return (
      <>
        <Button size={'small'} style={{fontSize:"11px"}} onClick={this.showModal} >새 카드 템플릿 추가</Button>
        <Modal
          title="새카드 템플릿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='만들기'
          cancelText='취소'
          maskClosable={false}
        >
          <div className="new_card_templete_container" style={{fontSize:"11px"}}>
            <ul>
              <li style={{display:"flex", alignItems:"center"}}>
                <span style={{width:"100px"}}>카드별칭</span><Input size="small" style={{width:"150px", fontSize:"11px"}}placeholder="별칭을 입력하세요"/>
              </li>
              <li>
                <div>카드종류</div>
                <Radio.Group onChange={this.onChange} style={{marginLeft:"30px", fontSize:"11px"}} value={this.state.defaultValue}>
                <Radio style={radioStyle} value='read'>
                  <span style={{marginRight:"10px"}}>학습 - 읽기카드</span>
                    <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
                <Radio style={radioStyle} value='flip_normal'>
                  <span style={{marginRight:"10px"}}>학습 - 뒤집기카드</span>
                  <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
                <Radio style={radioStyle} value='none'>
                  <span style={{marginRight:"10px"}}>기타 - 비학습카드</span>
                  <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
                <Radio style={radioStyle} value='share'>
                  <span style={{marginRight:"10px"}}>기타 - 공통지문카드</span>
                  <Tooltip title="prompt text" color="#2db7f5" >
                      <QuestionCircleOutlined />
                    </Tooltip>
                </Radio>
              </Radio.Group>
              </li>
            </ul>
            <Divider />
            <div>
              행 설정
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default NewCardTemplete;