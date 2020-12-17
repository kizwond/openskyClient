import React, { Component } from 'react';
import './Write.css'
import LikeSectionContent from './LikeSectionContent'
import ListSectionContent from './ListSectionContent'
import {NavLink} from 'react-router-dom'
import { Button } from 'antd';
import { DownCircleTwoTone,UpCircleTwoTone } from '@ant-design/icons';
import axios from 'axios'

class WriteMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isToggleOn: true,
      user:'',
      bookTitle:[],
      likeTitle:[],
      message:'',
      hideOrShowClass : false,
      category : [],
      hide_or_show: false,
      hide_or_show_like :false
     }
  }
  hideOrShowToggle = () => {
    axios.post('api/book/change-hide-config',{
      hide_toggle : !this.state.hide_or_show
    }).then(res => {
      this.setState({
        hide_or_show:res.data.write_config[0].write_config.hide_or_show
      })
    })
  }

  onClickToggle = () => {
    axios.post('api/book/change-like-config',{
      like_toggle : !this.state.isToggleOn
    }).then(res => {
      this.setState({
        isToggleOn:res.data.write_config[0].write_config.likebook
      })
    })
  }

  componentDidMount() {
    this.getOnlyShowTitle()
  }

  getOnlyShowTitle() {
    axios.get('api/book/get-booklist')
    .then(res => {
      console.log("first axios :",res.data)
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist,
        isToggleOn:res.data.write_config[0].write_config.likebook,
        hide_or_show:res.data.write_config[0].write_config.hide_or_show
      })
    })
  }

  updateState = (data) => {
    this.setState({
      category:data.value1,
      likeTitle:data.value2
    })
  }

  render() { 

    return ( 
      <div className="write_container">
        <div style={{fontSize:"13px", fontWeight:"700"}}>즐겨찾기</div>
        <br/>
        {this.state.isToggleOn ? <LikeSectionContent updateState={this.updateState}
                                                     category={this.state.category} 
                                                      
                                                     
                                                     hideOrShowClass={this.state.hideOrShowClass} 
                                                     hideOrShowToggle={this.hideOrShowToggle} 

                                                      
                                                     bookTitle={this.state.likeTitle}
                                                     hideOrShowToggleStateLike={this.state.hide_or_show_like}
                                                     hideOrShowToggleHandeler={this.hideOrShowToggleLike}/> : ''}
        
        <div style={{textAlign:"center", marginTop:"-20px"}}>
        {this.state.isToggleOn ? <UpCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/> 
                              : <div style={{borderBottom:"1px solid lightgrey", marginTop:"10px", marginBottom:"20px"}}>
                                  <div style={{marginBottom:"-15px"}}>
                                    <DownCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/>
                                  </div>
                                </div>}
        </div>
        <NavLink to="/naming" exact ><Button type="primary" className="make_new_book" size="small">새로만들기</Button></NavLink> 
        <div className="book_list_container_in_write">
          <ListSectionContent updateState={this.updateState}
                              category={this.state.category} 
                               
                              
                              hideOrShowClass={this.state.hideOrShowClass} 
                              hideOrShowToggle={this.hideOrShowToggle} 

                               
                              hideOrShowToggleState={this.state.hide_or_show}
                              hideOrShowToggleHandeler={this.hideOrShowToggle}
                              />
        </div>
      </div>
     );
  }
}
 
export default WriteMain;