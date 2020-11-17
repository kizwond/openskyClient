import React, { Component } from 'react';
import './LikeSectionContent.css'
import { EyeInvisibleOutlined, StarTwoTone, StarOutlined, EyeOutlined, ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import CategorySettingModal from './CategorySettingModal'
import CategoryMoveModal from './CategoryMoveModal'
import DeleteBook from './DeleteBookModal'
import ChangeBookTitle from './ChangeBookTitle'


class ListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     }
  }

  render() { 
    return ( 
      <ul className="like_list_columns">
        <li>카테고리 <CategorySettingModal categoryListOrderHandler={this.props.categoryListOrderHandler} 
                                          categoryDeleteHandler={this.props.categoryDeleteHandler} 
                                          addCategory={this.props.addCategory} 
                                          changeCategoryHandler={this.props.changeCategoryHandler} 
                                          category={this.props.category}/></li>
        <li>책이름</li>
        <li>책이름<br/>변경</li>
        <li>구분</li>
        <li>저자</li>
        <li>총페이지</li>
        <li>최근30일<br/>작성카드</li>
        <li>카드종류</li>
        <li>생성일</li>
        <li>최근작성일</li>
        <li>카테고리<br/>이동</li>
        <li>즐겨찾기</li>
        <li>순서이동</li>
        <li>목록에서<br/>감추기 
            {this.props.hideOrShowClass === false  ? <span onClick={this.props.hideOrShowToggle} className="hide_or_show_title_btn">OFF</span> : 
                                                     <span onClick={this.props.hideOrShowToggle} className="hide_or_show_title_btn">ON</span>}
        </li>
        <li>삭제</li>
      </ul> 
    );
  }
}

class ListContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editBookTitle:false,
     }
  }

  editBookTitleHandler = () =>{
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  titleChangeHandleClick = ()=> {
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  render() { 
    const info = this.props.bookInfo;
    const date = info.time_create.slice(0,10)
    const update_date = info.time_create.slice(0,10)
    const classes = `like_list_contents`
    const renderLike = () => {
      if(info.hide_or_show === false){
          if(info.like === true) {
            return <StarTwoTone onClick={()=>this.props.onClickLike({value:'true',bookId:this.props.bookInfo._id})} twoToneColor="#52c41a" style={{fontSize:'14px'}}/>
          }else {
            return <StarOutlined onClick={()=>this.props.onClickLike({value:'false',bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>
          } 
        } else{
          return 
        }
      }
    return ( 
      <>
       <div className={classes}>
          <ul>
            <li>{this.props.currentCategory}</li>
            <li>{this.state.editBookTitle ? <ChangeBookTitle bookTitle={info} 
                                                            category={this.props.category} 
                                                            changeBookTitleHandler={this.props.changeBookTitleHandler} 
                                                            onClick={this.titleChangeHandleClick}/> : <>{info.title}/{info.seq_in_category}</>}</li>
            <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
            <li>{info.type}</li>
            <li>{info.owner}</li>
            <li>{info.num_pages}</li>
            <li>{info.num_cards}</li>
            <li>단면 {info.single_cards}장<br/>양면 {info.dual_cards}장</li>
            <li>{date}</li>
            <li>{update_date}</li>
            <li><CategoryMoveModal category={this.props.categoryTotal} bookTitle={info} bookCategoryMove={this.props.bookCategoryMove}/></li>
            <li>
              {renderLike()}
            </li>
            <li>{info.hide_or_show === false ? <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'list',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category})} style={{fontSize:'14px'}}/>
                                              <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'list',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category})} style={{fontSize:'14px'}}/></> : ''}
            </li>
            <li>{info.hide_or_show === false ? <EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:false,bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>:
                                    <EyeInvisibleOutlined onClick={()=>this.props.onClickHideOrShow({value:true,bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>}</li>
            <li><DeleteBook bookTitle={info} bookDeleteHandler={this.props.bookDeleteHandler} /></li>
          </ul>
        </div> 
      </>
     );
  }
}
class CategoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category:this.props.categoryName
     };
  }
  render() {
    console.log(this.props.category)
    if(this.props.category.book_ids.length > 0){
      var bookList = this.props.category.book_ids.map((book_title) =>
        {
          if(book_title){
           return <ListContent category={this.props.category} 
                      currentCategory={this.state.category}
                      key={book_title._id} 
                      categoryTotal={this.props.categoryTotal}
                      bookCategoryMove={this.props.bookCategoryMove} 
                      bookInfo={book_title} 
                      listOrderHandler={this.props.listOrderHandler} 
                      changeBookTitleHandler={this.props.changeBookTitleHandler} 
                      bookDeleteHandler={this.props.bookDeleteHandler} 
                      onClickLike={this.props.onClickLike} 
                      onClickHideOrShow={this.props.onClickHideOrShow}/>
          } else{
            console.log('no books')
            return <div>hello</div>
          }
        
        }
      )
    } else {
      var bookList = this.props.category.name
    }
    
    return (

      <div className="each_category_container">{bookList}</div>

    );
  }
}

class ListSectionContent extends Component {
  render() { 
    if(this.props.category){
      var categoryList = this.props.category.map((category)=>(
        <CategoryListContainer key={category._id} 
                              categoryName={category.name} 
                              category={category} 
                              categoryTotal={this.props.category}
                              bookCategoryMove={this.props.bookCategoryMove} 
                              listOrderHandler={this.props.listOrderHandler} 
                              changeBookTitleHandler={this.props.changeBookTitleHandler} 
                              bookDeleteHandler={this.props.bookDeleteHandler} 
                              onClickLike={this.props.onClickLike} 
                              onClickHideOrShow={this.props.onClickHideOrShow}/>
      ))
    } else {
      var categoryList = 'none'
    }
    
    return ( 
      <div className="like_list_container">
        <ListColumns categoryListOrderHandler={this.props.categoryListOrderHandler} 
                    categoryDeleteHandler={this.props.categoryDeleteHandler} 
                    changeCategoryHandler={this.props.changeCategoryHandler} 
                    addCategory={this.props.addCategory} 
                    category={this.props.category} 
                    hideOrShowClass={this.props.hideOrShowClass} 
                    hideOrShowToggle={this.props.hideOrShowToggle} />
        {categoryList}
      </div>
     );
  }
}
 
export default ListSectionContent;