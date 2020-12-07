
import React, { Component } from 'react';
import { Avatar, Image, Button, Progress,  Menu, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import ProgressBar from "./progressBar";
import axios from 'axios'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class FlipMode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contents:[]
     };
  }
  // console.log('data:', JSON.parse(sessionStorage.getItem('study_setting')))
  componentDidMount(){
    const session_id = sessionStorage.getItem('session_id')
    axios.post('api/study/get-studying-cards',{
      session_id: session_id,
      current_seq:0,
      num_request_cards:2
    }).then(res => {
      console.log('데이타:', res.data)
      this.setState({
        contents:res.data.cards_to_send.cardlist_working
      })
    })
  }

  onClickNotKnow = ()=>{
    console.log("don't know")
  }

  render() {
    const style_study_layout_container ={
      display:"flex",
      flexDirection:"column",
      height:"45px",
    }
    const style_study_layout_top ={
      display:"flex",
      flexDirection:"row",
      width:"1000px",
      margin:"auto",
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
    const style_study_layout_bottom ={
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      width:"1440px",
      margin:"auto",
      marginTop:"10px"
    }
    const menu = (
      <Menu>
        <Menu.Item key="0">
          단기
        </Menu.Item>
        <Menu.Item key="1">
          장기
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          졸업
        </Menu.Item>
      </Menu>
    );
    if(this.state.contents.length > 0){
      console.log("data stored : ",this.state.contents)
      var first_face_data = this.state.contents[0]._id.content_of_first_face.map(item => item)
      var second_face_data = this.state.contents[0]._id.content_of_second_face.map(item => item)
      var annotation_data = this.state.contents[0]._id.content_of_annot.map(item => item)
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
            <div>현재카드</div>
            <div>총경과시간</div>
            <div><Button type="primary" danger style={{ borderRadius:"10px"}}>일시정지</Button></div>
          </div>
        </div>
        <div style={style_study_layout_bottom} className="study_layout_middle">
          <div style={{width:"200px", border:"1px solid lightgrey", borderRadius:"10px", textAlign:"right"}}>플래그 영역</div>
          <div style={{width:"1000px", border:"1px solid lightgrey", borderRadius:"10px"}}>
            <div style={{height:"600px", backgroundColor:"white", padding:"10px", borderRadius:"10px 10px 0 0"}}><FroalaEditorView model={first_face_data}/><FroalaEditorView model={second_face_data}/><FroalaEditorView model={annotation_data}/></div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"70px", alignItems:"center", backgroundColor:"#e9e9e9", padding:"10px 90px", borderRadius:"0 0 10px 10px"}}>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}} onClick={this.onClickNotKnow}>모르겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}}>거의모름</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}}>애매함</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}}>거의알겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px"}}>알겠음</Button>
              <Button size="large" style={{fontSize:"13px", fontWeight:"500", border:"1px solid #bababa",borderRadius:"7px", width:"120px", backgroundColor:"#7dbde1"}}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>패스 <DownOutlined /></a>
                </Dropdown>
              </Button>
            </div>
          </div>
          <div style={{width:"200px", border:"1px solid lightgrey", borderRadius:"10px"}}>side 영역</div>
        </div>
      </div>
    );
  }
}

export default FlipMode;