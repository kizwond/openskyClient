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
      category : []
     }
  }
  onClickToggle = () => {
    axios.post('api/create/like-hide-or-show-toggle',{
      isToggleOn : !this.state.isToggleOn
    }).then(res => {
      this.setState({
        isToggleOn : res.data.likeToggle.toggle
      })
    })
  }
  getAllTitle() {
    axios.get('api/write/get-booklist')   
    .then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle,
        category:res.data.category,
        isToggleOn:res.data.LikeToggle
      })
    })
  }
  getOnlyShowTitle() {
    axios.get('api/write/get-booklist')
    .then(res => {
      this.setState({
        category:res.data.categorybooklist
      })
    })
  }

  hideOrShowToggle = () => {
    if (this.state.hideOrShowClass === false){
      this.getAllTitle()
      this.setState((prevState)=>({
          hideOrShowClass : !prevState.hideOrShowClass
        })
      )
    } else if (this.state.hideOrShowClass === true){
      this.getOnlyShowTitle()
      this.setState((prevState)=>({
          hideOrShowClass : !prevState.hideOrShowClass
        })
      )
    }
    

  }

  componentDidMount() {
    this.getOnlyShowTitle()
  }
  saveLikeChange = (value) => {
    if (value.value === 'true') {
      var like = 'false'
    } else {
      like = 'true'
    }
    axios.post('api/write/like',{
      bookId : value.bookId,
      like: like,
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }

  eyeClickHandler = (value) =>{
    if (value.value === false) {
      var eye = true
    } else {
      eye = false
    }
    axios.post('api/write/hide-or-show',{
      bookId : value.bookId,
      hide_or_show: eye,
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }
  bookDeleteHandler = (value) => {
    axios.post('api/write/delete-book',{
      book_id : value.book_id,
      seq_in_category : value.seq_in_category,
      seq_in_like : value.seq_in_like,
      category_id : value.category_id,
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist
      })
    })
  }

  changeBookTitleHandler = (value) => {
    axios.post('api/create/change-book-title',{
      bookId : value.bookId,
      newName : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 이름의 책이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          bookTitle:res.data.bookTitle,
          likeTitle:res.data.likeTitle
        })
      }
    })
  }

  listOrder = (value) => {
    console.log('book_id :', value.bookId)
    console.log('action :', value.action)
    console.log('from :', value.from)
    console.log('seq_in_category :', value.seq_in_category)
    axios.post('api/write/change-book-order',{
      book_id : value.bookId,
      action : value.action,
      from : value.from,
      seq_in_category:value.seq_in_category
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }

  bookCategoryMove = (value) => {
    axios.post('api/write/move-book-between-category',{
      book_id : value.bookId,
      prev_category_id : value.prevCategory,
      target_category_id : value.category,
      seq_in_category: value.seq_in_category
    }).then(res => { 
        this.setState({
          category:res.data.categorybooklist
        })
    })
  }

  addCategory = (value) => {
    axios.post('api/write/create-category',{
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
          category:res.data.categorybooklist
        })
      }
    })
  }

  changeCategoryHandler = (value) => {
    axios.post('api/create/change-category-name',{
      category_id : value.categoryId,
      newName : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 카테고리명이 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          bookTitle:res.data.bookTitle,
          likeTitle:res.data.likeTitle,
          category:res.data.category
        })
      }
    })
  }
  categoryDeleteHandler = (value) => {
    if(value.moveTo === ""){
      value.moveTo = 'none'
    }
    axios.post('api/write/delete-category',{
      category_id : value.value.categoryId,
      target_category : value.moveTo,
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist
      })
    })
  }

  categoryListOrder = (value) => {
    console.log('category_id:',value.categoryId)
    console.log('action:',value.action)
    console.log('seq:',value.categorySeq)
    axios.post('api/write/change-category-order',{
      category_id : value.categoryId,
      action : value.action,
      seq:value.categorySeq
    }).then(res => {
      this.setState({
        category:res.data.categorybooklist
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
                                                     bookTitle={this.state.likeTitle}/> : ''}
        
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
                              />
        </div>
      </div>
     );
  }
}
 
export default WriteMain;