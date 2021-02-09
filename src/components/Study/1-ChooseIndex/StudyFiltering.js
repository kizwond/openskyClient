import React, { Component } from 'react';
import { Modal, DatePicker } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import DefaultButton from '../../../styledComponents/defaultButton'

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
            <DefaultButton key="back" onClick={this.props.handleCancel}>
              취소
            </DefaultButton>,
            <DefaultButton key="submit" type="primary" onClick={this.props.handleOk}>
              적용
            </DefaultButton>,
          ]}
        >
          <div>
            <div style={flexStyle}>
              <span style={settingTitle}>플래그</span>
              <ul style={flexStyle2}>
                <li><DefaultButton width='50px' size="small">플래그1</DefaultButton></li>
                <li><DefaultButton width='50px' size="small">플래그2</DefaultButton></li>
                <li><DefaultButton width='50px' size="small">플래그3</DefaultButton></li>
                <li><DefaultButton width='50px' size="small">플래그4</DefaultButton></li>
                <li><DefaultButton width='50px' size="small">플래그5</DefaultButton></li>
              </ul>
            </div>
            <div style={flexStyle}>
              <span style={settingTitle}>중요도</span>
              <ul style={flexStyle2}>
                <li><DefaultButton width='50px' size="small"><StarTwoTone/> x 1</DefaultButton></li>
                <li><DefaultButton width='50px' size="small"><StarTwoTone/> x 2</DefaultButton></li>
                <li><DefaultButton width='50px' size="small"><StarTwoTone/> x 3</DefaultButton></li>
                <li><DefaultButton width='50px' size="small"><StarTwoTone/> x 4</DefaultButton></li>
                <li><DefaultButton width='50px' size="small"><StarTwoTone/> x 5</DefaultButton></li>
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