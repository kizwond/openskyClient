import React, { Component } from 'react';
import axios from 'axios'
import MenteeList from "./MenteeList"
import MentorList from "./MentorList"
import { Layout,Button,Badge } from 'antd';
import "./StudyList.css"
import {UserSwitchOutlined,UsergroupAddOutlined} from '@ant-design/icons';

const { Content } = Layout;

class MentoringMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category : [],
      selected_book:[]
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
  render() { 
    if(this.state.selected_book){
      console.log('value chosen : ', this.state.selected_book)
    }
    return ( 
      <div className="study_page_booklist_container">
          <Layout>
            <Content className="study_page_content_padding">
              <div className="study_page_list_title"><Badge count={5} size="small"><Button size="small" style={{fontSize:"11px", width:"100px"}}><UserSwitchOutlined /> 멘토링 요청</Button></Badge></div>
              <MentorList/>
              <div className="study_page_list_title study_page_bottom_title"><Badge count={5} size="small"><Button size="small" style={{fontSize:"11px", width:"100px"}}><UsergroupAddOutlined /> 멘토링 수락</Button></Badge></div>
              <MenteeList selectBook={this.selectBook} category={this.state.category}/>
            </Content>
          </Layout>
      </div>
     );
  }
}
 
export default MentoringMain;