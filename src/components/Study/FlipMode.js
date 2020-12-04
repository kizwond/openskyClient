
import React, { Component } from 'react';
import { Avatar, Image, Button, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProgressBar from "./progressBar";

class FlipMode extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const style_study_layout_container ={
      display:"flex",
      flexDirection:"column",
      width:"1000px",
      margin:"auto",
      height:"45px",
    }
    const style_study_layout_top ={
      display:"flex",
      flexDirection:"row",
      width:"100%"
    }
    const style_study_layout_top_left ={
      display:"flex",
      flexDirection:"row",
      width:"50%",
      alignItems:"center",
      justifyContent:"space-between",
      marginRight:"15px"
    }
    const style_study_layout_top_right ={
      display:"flex",
      flexDirection:"row",
      width:"50%",
      justifyContent:"space-between",
      border:"1px solid lightgrey",
      borderRadius:"10px",
      backgroundColor:"white",
      padding:5,
      fontSize:"12px"
    }
    return (
      <div style={style_study_layout_container} className="study_layout_container">
        <div style={style_study_layout_top} className="study_layout_top">
          <ul style={style_study_layout_top_left} className="study_layout_top_left">
            <li style={{marginRight:"10px"}}><Avatar size="large" icon={<UserOutlined />} /></li>
            <li style={{marginRight:"10px", width:"320px"}}>
              <ul>
                <li style={{display:"flex",alignItems:"center",marginBottom:"3px"}}><span style={{marginRight:"10px", width:"40px", fontSize:"11px"}}>완료율</span><ProgressBar bgcolor={"#32c41e"} completed={60} /></li>
                <li style={{display:"flex",alignItems:"center"}}><span style={{marginRight:"10px", width:"40px", fontSize:"11px"}}>학습율</span><ProgressBar bgcolor={"#a1bbe9"} completed={80} /></li>
              </ul>
            </li>
            <li><Button style={{height:"45px", borderRadius:"10px"}}>학습카드추가</Button></li>
          </ul>
          <div style={style_study_layout_top_right} className="study_layout_top_right">
            <div>현재카드시계</div>
            <div>총경과시간</div>
            <div><Button type="primary" danger style={{ borderRadius:"10px"}}>일시정지</Button></div>
          </div>
        </div>
        <div className="study_layout_middle">
          contents
        </div>
      </div>
    );
  }
}

export default FlipMode;