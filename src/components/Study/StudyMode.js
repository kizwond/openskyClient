import React, { Component } from 'react';
import { Radio,Row, Col, Divider,Alert,Button,Switch,Input } from 'antd';

class StudyMode extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  
  render() {
    var radioStyle1 = {
      display: 'block',
      // height: '20px',
      fontSize:'12px',
      marginTop:'5px'
    };

    var radioStyle3 = {
      display: 'block',
      // height: '20px',
      fontSize:'12px',
      marginTop:'5px',
      marginLeft:'20px'
    };
    
    return (
      <div style={{marginLeft:"20px"}}>
        <ul>
          <li><span>- 신규카드(00)</span><Switch size="small" onChange={this.props.onChangeNew} checked={this.props.newToggle}/> <Button size="small" style={{fontSize:"10px"}}>All</Button><Input onChange={this.props.onChangeNewCardNum} value={this.props.newCardNum} style={{width:"70px"}} size="small" type="number" />장</li>
          <li><span>- 기 학습카드</span><Switch size="small" onChange={this.props.onChangeReview} checked={this.props.reviewToggle}/> <Button size="small" style={{fontSize:"10px"}}>All</Button><Input onChange={this.props.onChangeReviewCardNum} value={this.props.reviewCardNum} style={{width:"70px"}} size="small" type="number" />장</li>
          {this.props.reviewToggle === true ? 
            <Radio.Group onChange={this.props.onChangeReviewDetail} value={this.props.reviewDetail}>
              <Radio style={radioStyle3} value="all">모든카드</Radio>
              <Radio style={radioStyle3} value="review">
                복습 시점 도래카드
                {this.props.reviewDetail === "review" ? 
                  <div style={{marginLeft:"20px"}}>
                      <Radio.Group onChange={this.props.onChangeReviewDetailDetail} value={this.props.reviewDetailDetail}>
                        <Radio style={radioStyle1} value="now">현시각기준</Radio>
                        <Radio style={radioStyle1} value="today">금일기준</Radio>
                      </Radio.Group>
                  </div> : null}
              </Radio>
            </Radio.Group> : null}
          <li><span>- 보류카드</span><Switch size="small" onChange={this.props.onChangeHold} /></li>
          <li><span>- 완료카드</span><Switch size="small" onChange={this.props.onChangeCompleted} /></li>
        </ul>
      </div>
    );
  }
}

export default StudyMode;