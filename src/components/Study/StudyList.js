import React, { Component } from 'react';
import axios from 'axios'
import ListSectionContent from "./ListSectionContent"
import LikeSectionContent from "./LikeSectionContent"
import { Layout,Button } from 'antd';
import "./StudyList.css"
import { NavLink} from 'react-router-dom';

const { Sider, Content } = Layout;

class WriteMain extends Component {
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
    axios.post('api/study/save-booklist-in-session',{
      book_ids: this.state.selected_book
    }).then(res => {
      console.log("before href:",res)
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
              <div className="study_page_list_title">즐겨찾기</div>
              <LikeSectionContent category={this.state.category}/>
              <div className="study_page_list_title study_page_bottom_title">내 공부방</div>
              <ListSectionContent selectBook={this.selectBook} category={this.state.category}/>
            </Content>
            <Sider style={{ padding:"10px",borderLeft:"1px solid grey", background:'#f5f5f5'}}>
              <Button size="small" style={{fontSize:'10px'}}>플래그설정</Button> <Button size="small" style={{fontSize:'10px'}}>즐겨찾기 설정</Button>
              <NavLink to={{
                pathname:"/choose-index",
                selectedBook:{value:this.state.selected_book}
              }} exact><Button size="large" style={{width:'100px'}} onClick={this.sessionSaveBookIds}>다음</Button></NavLink>
            </Sider>
          </Layout>
      </div>
     );
  }
}
 
export default WriteMain;