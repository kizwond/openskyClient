import React, { Component } from 'react';
import axios from 'axios'
import LikeSectionContent from "../0-StudyList/LikeSectionContent/LikeSectionContent"
import ListSectionContent from "../0-StudyList/ListSectionContent/ListSectionContent"
import { Layout,Button } from 'antd';
import "./StudyList.css"

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
    sessionStorage.removeItem("book_ids")
    sessionStorage.setItem('current_seq',0);
    this.showTitle()
  }
  showTitle() {
    axios.get('api/book/get-booklist')
    .then(res => {
      console.log(res)
      this.setState({
        category:res.data.categorybooklist
      })
    })
  }
  renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  selectBook = (value)=> {
    const json = value.book_info
    json.forEach( obj => this.renameKey( obj, 'book_title', 'title' ) );
    this.setState({
      selected_book:json
    })
  }

  sessionSaveBookIds = () => {
    sessionStorage.setItem("book_ids", JSON.stringify(this.state.selected_book));
    window.location.href ="/choose-index"    
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
              <Button size="large" style={{width:'100px'}} onClick={this.sessionSaveBookIds}>다음</Button>
            </Sider>
          </Layout>
      </div>
     );
  }
}
 
export default WriteMain;