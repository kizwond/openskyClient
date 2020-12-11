import React, { Component } from 'react';
import axios from 'axios'
import MenteeList from "./MenteeList"
import MentorList from "./MentorList"
import { Layout,Button,Badge,Select,Modal } from 'antd';
import "./StudyList.css"
import {UserSwitchOutlined,UsergroupAddOutlined} from '@ant-design/icons';
import MentoringWaiting from './MentoringWaiting'
import MentoringAsk from './MentoringAsk'

const { Content } = Layout;
const { Option } = Select;
class MentoringMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category : [],
      selected_book:[],
      isModalVisible:false
     }
  }
  componentDidMount() {
    this.getOnlyShowTitle()
  }
  getOnlyShowTitle() {
    axios.get('api/book/get-booklist')
    .then(res => {
      console.log(res)
      this.setState({
        category:res.data.categorybooklist
      })
    })
  }
  selectBook = (value)=> {
    this.setState({
      selected_book:value
    })
  }

  sessionSaveBookIds = () => {
    sessionStorage.removeItem("session_id")
    axios.post('api/studysetup/save-booklist',{
      book_ids: this.state.selected_book
    }).then(res => {
      sessionStorage.setItem('session_id',res.data.session_id);
      sessionStorage.setItem('current_seq','0');
      window.location.href ="/choose-index"
    })
  }
  showModal = () => {
    this.setState({
      isModalVisible:true
    })
  };

  handleOk = () => {
    this.setState({
      isModalVisible:false
    })
  };

  handleCancel = () => {
    this.setState({
      isModalVisible:false
    })
  };

  render() { 
    if(this.state.selected_book){
      console.log('value chosen : ', this.state.selected_book)
    }
    return ( 
      <div className="study_page_booklist_container">
          <Layout>
            <Content className="study_page_content_padding">
              <div className="study_page_list_title"><Badge count={5} size="small"><Button size="small" onClick={this.showModal} style={{fontSize:"11px", width:"100px"}}><UserSwitchOutlined /> 멘토링 요청</Button></Badge>
                <Modal
                  title="멘토링 요청"
                  visible={this.state.isModalVisible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <span style={{fontSize:"11px"}}>요청한 멘토링</span>
                  <MentoringWaiting/>
                  <span style={{fontSize:"11px"}}>멘토링 요청하기</span>
                  <MentoringAsk/>
                </Modal>
              </div>
              <MentorList/>
              <div className="study_page_list_title study_page_bottom_title"><Badge count={5} size="small"><Button size="small" style={{fontSize:"11px", width:"100px"}}><UsergroupAddOutlined /> 멘토링 수락</Button></Badge></div>
              <div style={{padding:5, backgroundColor:"white" }}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"5px"}}>
                  <div>
                    <Select style={{width:"100px", fontSize:"11px"}} defaultValue="재수종합1반" size="small">
                      <Option value="jack">재수종합1반</Option>
                      <Option value="lucy">재수종합2반</Option>
                    </Select>
                  </div>
                  <div>
                    <Button size="small" style={{fontSize:"11px", width:"100px", marginRight:"5px"}}>학습정보 내려받기</Button>
                    <Button size="small" style={{fontSize:"11px", width:"100px"}}>멘토링 관리</Button>
                  </div>
                </div>
                <MenteeList/>
              </div>
            </Content>
          </Layout>
      </div>
     );
  }
}
 
export default MentoringMain;