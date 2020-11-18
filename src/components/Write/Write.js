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
    this.setState(state => ({
      hide_or_show: !state.hide_or_show
    }));
  }
  hideOrShowToggleLike = () => {
    this.setState(state => ({
      hide_or_show_like: !state.hide_or_show_like
    }));
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

  // getAllTitle() {
  //   axios.get('api/book/get-booklist')   
  //   .then(res => {
  //     this.setState({
  //       bookTitle:res.data.bookTitle,
  //       likeTitle:res.data.likeTitle,
  //       category:res.data.category,
  //       isToggleOn:res.data.LikeToggle
  //     })
  //   })
  // }
  getOnlyShowTitle() {
    axios.get('api/book/get-booklist')
    .then(res => {
      console.log("first axios :",res.data)
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist,
        isToggleOn:res.data.write_config[0].write_config.likebook
      })
    })
  }

  componentDidMount() {
    this.getOnlyShowTitle()
  }
  saveLikeChange = (value) => {
    console.log("like clicked!!! ")
    if (value.value === 'true') {
      var like = 'false'
    } else {
      like = 'true'
    }
    console.log("book_id :",value.bookId)
    console.log("like :",like)
    axios.post('api/book/apply-likebook',{
      book_id : value.bookId,
      like: like
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist
      })
    })
  }

  eyeClickHandler = (value) =>{
    console.log('hide_or_show : ',value)
    axios.post('api/book/change-hide-or-show',{
      book_id : value.bookId,
      hide_or_show: value.value,
      seq_in_category: value.seq_in_category,
      seq_in_like: value.seq_in_like,
      category_id: value.category_id
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist
      })
    })
  }
  bookDeleteHandler = (value) => {
    axios.post('api/book/delete-book',{
      book_id : value.book_id,
      seq_in_category : value.seq_in_category,
      seq_in_like : value.seq_in_like,
      category_id : value.category_id,
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist
      })
    })
  }

  changeBookTitleHandler = (value) => {
    axios.post('api/book/change-book-title',{
      book_id : value.bookId,
      name : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 이름의 책이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          category:res.data.categorybooklist,
          likeTitle:res.data.likebooklist
        })
      }
    })
  }

  listOrder = (value) => {
    console.log(value)
    if(value.from === "list"){
      axios.post('api/book/change-book-order',{
        book_id : value.bookId,
        action : value.action,
        seq_in_category:value.seq_in_category,
        category_id: value.category_id
      }).then(res => {
        console.log('순서조정후 res:', res.data)
        this.setState({
          category:res.data.categorybooklist,
          likeTitle:res.data.likebooklist
        })
      })
    } else {
      axios.post('api/book/change-likebook-order',{
        book_id : value.bookId,
        action : value.action,
        seq_in_like:value.seq_in_like,
      }).then(res => {
        console.log('순서조정후 res:', res.data)
        this.setState({
          category:res.data.categorybooklist,
          likeTitle:res.data.likebooklist
        })
      })
    }
    
  }
  

  bookCategoryMove = (value) => {
    console.log(value)
    axios.post('api/book/move-book-between-category',{
      book_id : value.bookId,
      prev_category_id : value.prevCategory,
      target_category_id : value.category,
      seq_in_category: value.seq_in_category,
      hide_or_show:value.hide_or_show
    }).then(res => { 
        this.setState({
          category:res.data.categorybooklist,
          likeTitle:res.data.likebooklist
        })
    })
  }

  addCategory = (value) => {
    axios.post('api/book/create-category',{
      prev_category_id : value.prevCategoryId,
      prev_category_seq : value.prevCategorySeq,
      new_category : value.value.newCategory,
    }).then(res => {
      if(res.data.error === "동일한 이름의 카테고리명이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          category:res.data.categorybooklist,
          likeTitle:res.data.likebooklist
        })
      }
    })
  }

  changeCategoryHandler = (value) => {
    axios.post('api/book/change-category-name',{
      category_id : value.categoryId,
      name : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 카테고리명이 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          category:res.data.categorybooklist,
          likeTitle:res.data.likebooklist
        })
      }
    })
  }
  categoryDeleteHandler = (value) => {
    if(value.moveTo === ""){
      value.moveTo = 'none'
    }
    axios.post('api/book/delete-category',{
      category_id : value.value.categoryId,
      target_category : value.moveTo,
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist
      })
    })
  }

  categoryListOrder = (value) => {
    console.log('category_id:',value.categoryId)
    console.log('action:',value.action)
    console.log('seq:',value.categorySeq)
    axios.post('api/book/change-category-order',{
      category_id : value.categoryId,
      action : value.action,
      seq:value.categorySeq
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist,
        likeTitle:res.data.likebooklist
      })
    })
  }

  render() { 
    return ( 
      <div className="write_container">
        <div style={{fontSize:"13px", fontWeight:"700"}}>즐겨찾기</div>
        <br/>
        {this.state.isToggleOn ? <LikeSectionContent category={this.state.category} 
                                                     bookCategoryMove={this.bookCategoryMove} 
                                                     onClickLike={this.saveLikeChange} 
                                                     hideOrShowClass={this.state.hideOrShowClass} 
                                                     hideOrShowToggle={this.hideOrShowToggle} 
                                                     listOrderHandler={this.listOrder} 
                                                     changeBookTitleHandler={this.changeBookTitleHandler} 
                                                     bookDeleteHandler={this.bookDeleteHandler} 
                                                     onClickHideOrShow={this.eyeClickHandler} 
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
          <ListSectionContent addCategory={this.addCategory} 
                              categoryListOrderHandler={this.categoryListOrder}
                              categoryDeleteHandler={this.categoryDeleteHandler} 
                              changeCategoryHandler={this.changeCategoryHandler} 
                              category={this.state.category} 
                              bookCategoryMove={this.bookCategoryMove} 
                              onClickLike={this.saveLikeChange} 
                              hideOrShowClass={this.state.hideOrShowClass} 
                              hideOrShowToggle={this.hideOrShowToggle} 
                              listOrderHandler={this.listOrder} 
                              changeBookTitleHandler={this.changeBookTitleHandler} 
                              bookDeleteHandler={this.bookDeleteHandler} 
                              onClickHideOrShow={this.eyeClickHandler} 
                              hideOrShowToggleState={this.state.hide_or_show}
                              hideOrShowToggleHandeler={this.hideOrShowToggle}
                              />
        </div>
      </div>
     );
  }
}
 
export default WriteMain;