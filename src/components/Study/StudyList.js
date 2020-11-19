import React, { Component } from 'react';
import axios from 'axios'
import ListSectionContent from "./ListSectionContent"
import LikeSectionContent from "./LikeSectionContent"
import { Layout } from 'antd';
import "./StudyList.css"
const { Sider, Content } = Layout;

class WriteMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category : []
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
  render() { 
    console.log('start : ',this.state.category)
    return ( 
      <div className="study_page_booklist_container">
          <Layout>
            <Content className="study_page_content_padding">
              <div className="study_page_list_title">즐겨찾기</div>
              <LikeSectionContent category={this.state.category}/>
              <div className="study_page_list_title study_page_bottom_title">내 공부방</div>
              <ListSectionContent category={this.state.category}/>
            </Content>
            <Sider style={{ padding:"10px",borderLeft:"1px solid grey", background:'#f5f5f5'}}>Sider</Sider>
          </Layout>
      </div>
     );
  }
}
 
export default WriteMain;