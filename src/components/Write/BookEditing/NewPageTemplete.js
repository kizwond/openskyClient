import React, { Component } from 'react';
import { Button, Switch, Modal, Select, Input, InputNumber } from 'antd';
import axios from 'axios'
const { Option } = Select;


class NewPageTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible:false,
      cardType:'카드종류를 선택해 주세요',
      cardNick:'',
      cardStar:false,
      card1:'',
      card2:'',
      card3:'',
      annotation:false,
      annotationNum:'',
     };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(this.state.cardType);
    console.log(this.state.cardNick);
    console.log(this.state.cardStar);
    console.log(this.state.card1);
    console.log(this.state.card2);
    console.log(this.state.card3);
    console.log(this.state.annotation);
    console.log(this.state.annotationNum);
    const value = {
                  card_type: this.state.cardType,
                  card_nick: this.state.cardNick,
                  card_star: this.state.cardStar,
                  face_1: this.state.card1,
                  face_2: this.state.card2,
                  face_3: this.state.card3,
                  annotation: this.state.annotation,
                  annotationNum: this.state.annotationNum,
                  }
    this.addCardType(value)
    this.setState({
      cardType:'카드종류를 선택해 주세요',
      cardNick:'',
      cardStar:false,
      card1:'',
      card2:'',
      card3:'',
      annotation:false,
      visible: false,
      annotationNum:'',
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

  handleCancel = e => {
    console.log(e);
    this.setState({
      cardType:'카드종류를 선택해 주세요',
      cardNick:'',
      cardStar:false,
      card1:'',
      card2:'',
      card3:'',
      annotation:false,
      visible: false,
      annotationNum:'',
    });
  };
  handleChangeCardType=(value)=> {
    this.setState({
      cardType: value,
    });
  }
  handleChangeCardNick=(e)=> {
    this.setState({
      cardNick: e.target.value
    });
  }
  handleChangeStar=(value)=> {
    this.setState({
      cardStar: value,
    });
  }
  handleChangeNum1=(value)=> {
    this.setState({
      card1: value,
    });
  }
  handleChangeNum2=(value)=> {
    this.setState({
      card2: value,
    });
  }
  handleChangeNum3=(value)=> {
    this.setState({
      card3: value,
    });
  }
  handleChangeAnnotation=(value)=> {
    this.setState({
      annotation: value,
    });
  }
  handleChangeAnnotationNum=(value)=> {
    this.setState({
      annotationNum: value,
    });
  }
  render() {
    return (
      <>
        <Button size={'small'} style={{fontSize:"11px"}} onClick={this.showModal} >새 페이지 템플릿 추가</Button>
        <Modal
          title="새 페이지 템플릿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='만들기'
          cancelText='취소'
          maskClosable={false}
        >
          <div className="new_card_templete_container">
            <div className="new_card_templete_columns">
              <div>카드종류</div>
              <div>카드별칭</div>
              <div>중요도 면 생성</div>
              <div>1면 - 행 생성 개수</div>
              <div>2면 - 행 생성 개수</div>
              <div>3면 - 행 생성 개수</div>
              <div>주석 면 생성</div>
              <div>주석 면 행 생성 개수</div>
            </div>
            <div className="new_card_templete_contents">
              <div>
                <Select autoFocus={true} size='small' value={this.state.cardType} style={{ width: 180 }} onChange={this.handleChangeCardType}>
                  <Option value="카드종류를 선택해 주세요">카드종류를 선택해 주세요</Option>
                  <Option value="face1">1면</Option>
                  <Option value="face2">2면</Option>
                  <Option value="face3">3면</Option>
                </Select>
              </div>
              <div>
                <Input size='small' style={{ width: 180 }} placeholder="카드별칭을 입력해 주세요" value={this.state.cardNick} onChange={this.handleChangeCardNick}/>
              </div>
              <div>
                <Switch size='small' checked={this.state.cardStar} onChange={this.handleChangeStar} />
              </div>
              <div>
                {this.state.cardType !== '카드종류을 선택해 주세요' ? <InputNumber size='small' style={{ width: 50 }} value={this.state.card1} onChange={this.handleChangeNum1} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeNum1} min="1" max="5" disabled/> }
                최대 5행
              </div>
              <div>
                {this.state.cardType === 'face2' || this.state.cardType ==='face3'? <InputNumber size='small' style={{ width: 50 }} value={this.state.card2} onChange={this.handleChangeNum2} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeNum2} min="1" max="5" disabled/> }
                최대 5행
              </div>
              <div>
                {this.state.cardType === 'face3' ? <InputNumber size='small' style={{ width: 50 }} value={this.state.card3} onChange={this.handleChangeNum3} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeNum3} min="1" max="5" disabled/> }
                최대 5행
              </div>
              <div>
                <Switch size='small' checked={this.state.annotation} onChange={this.handleChangeAnnotation} />
              </div>
              <div>
                {this.state.annotation === true ? <InputNumber size='small' style={{ width: 50 }} value={this.state.annotationNum} onChange={this.handleChangeAnnotationNum} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeAnnotationNum} min="1" max="5" disabled/> }
                최대 5행
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default NewPageTemplete;