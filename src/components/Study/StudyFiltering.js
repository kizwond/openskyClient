import React, { Component } from 'react';
import { Modal, Button, DatePicker } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
class StudyFiltering extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const { visible } = this.props;
    const flexStyle ={
      display:'flex',
      flexDirection:'row',
      marginLeft:'10px',
      fontSize:'11px',
      fontWeight:'700',
      lineHeight:'24px'
    }
    const flexStyle2 ={
      display:'flex',
      flexDirection:'row',
      marginLeft:'10px',
      justifyContent:'space-between',
      width:'280px'
    }
    const buttonStyle ={
      fontSize:"10px",
      width:'50px'
    }
    const settingTitle ={
      width:'100px'
    }
    const { RangePicker } = DatePicker;
    return (
      <Modal
          visible={visible}
          title="필터링 설정"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={this.props.handleOk}>
              적용
            </Button>,
          ]}
        >
          <div>
            <div style={flexStyle}>
              <span style={settingTitle}>플래그</span>
              <ul style={flexStyle2}>
                <li><Button style={buttonStyle} size="small">플래그1</Button></li>
                <li><Button style={buttonStyle} size="small">플래그2</Button></li>
                <li><Button style={buttonStyle} size="small">플래그3</Button></li>
                <li><Button style={buttonStyle} size="small">플래그4</Button></li>
                <li><Button style={buttonStyle} size="small">플래그5</Button></li>
              </ul>
            </div>
            <div style={flexStyle}>
              <span style={settingTitle}>중요도</span>
              <ul style={flexStyle2}>
                <li><Button style={buttonStyle} size="small"><StarTwoTone/> x 1</Button></li>
                <li><Button style={buttonStyle} size="small"><StarTwoTone/> x 2</Button></li>
                <li><Button style={buttonStyle} size="small"><StarTwoTone/> x 3</Button></li>
                <li><Button style={buttonStyle} size="small"><StarTwoTone/> x 4</Button></li>
                <li><Button style={buttonStyle} size="small"><StarTwoTone/> x 5</Button></li>
              </ul>
            </div>
            <div style={flexStyle}>
              <span style={settingTitle}>최근학습시점</span>
              <ul style={flexStyle2}>
                <li><RangePicker showTime separator='~' size="small"/></li>
              </ul>
            </div>
          </div>
        </Modal>
    );
  }
}

export default StudyFiltering;