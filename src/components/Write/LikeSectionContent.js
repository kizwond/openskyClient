import React, { Component } from 'react';
import './LikeSectionContent.css'
import { StarTwoTone,StarOutlined,EyeOutlined,EyeInvisibleOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import CategoryMoveModal from './CategoryMoveModal'
import DeleteBook from './DeleteBookModal'
import ChangeBookTitle from './ChangeBookTitle'
import { Empty,Switch } from 'antd';

class LikeListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }
  onChange = (checked) => {
    console.log(`switch to ${checked}`);
    this.props.hideOrShowToggle()
  }
  render() { 
    return ( 
      <ul className="like_list_columns">
        <li>카테고리</li>
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
        <li>보기</li>
        <li>삭제</li>
      </ul> 
    );
  }
}

class LikeListContent extends Component {
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
    const toggleProps = this.props.hideOrShowToggleState;
    const date = info.time_create.slice(0,10)
    const update_date = info.time_create.slice(0,10)
    const classes = `like_list_contents`
    // const classes = `like_list_contents hide_or_show_${info.hide_or_show}`
    const renderLike = () => {
      if(info.hide_or_show === true){
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
        {toggleProps === true ? 
          <>
          {info.like === true ? 
            <div className={classes}>
            <ul>
              <li>{info.category_id.name}</li>
              <li>{this.state.editBookTitle ? <ChangeBookTitle bookTitle={info} 
                                                                changeBookTitleHandler={this.props.changeBookTitleHandler} 
                                                                onClick={this.titleChangeHandleClick}/> : <>{info.title}/순서 : {info.seq_in_like}</>}</li>
              <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
              <li>{info.type}</li>
              <li>{info.owner}</li>
              <li>{info.num_pages}</li>
              <li>{info.num_cards}</li>
              <li>단면 {info.single_cards}장<br/>양면 {info.dual_cards}장</li>
              <li>{date}</li>
              <li>{update_date}</li>
              <li><CategoryMoveModal category={this.props.category} bookTitle={info} bookCategoryMove={this.props.bookCategoryMove}/></li>
              <li>{renderLike()} </li>
              <li>{info.hide_or_show === true ? <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
                                                    <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></> : ''}
                </li>
              <li>{info.hide_or_show === false ? <EyeInvisibleOutlined onClick={()=>this.props.onClickHideOrShow({value:true,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>:
                                                  <EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>}</li>
              <li><DeleteBook bookTitle={info} bookDeleteHandler={this.props.bookDeleteHandler} /></li>
            </ul>
          </div> 
          : ''} 
        </> 
          : <>
          {info.like === true  & info.hide_or_show === true? 
            <div className={classes}>
            <ul>
              <li>{info.category_id.name}</li>
              <li>{this.state.editBookTitle ? <ChangeBookTitle bookTitle={info} 
                                                                changeBookTitleHandler={this.props.changeBookTitleHandler} 
                                                                onClick={this.titleChangeHandleClick}/> : <>{info.title}/순서 : {info.seq_in_like}</>}</li>
              <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
              <li>{info.type}</li>
              <li>{info.owner}</li>
              <li>{info.num_pages}</li>
              <li>{info.num_cards}</li>
              <li>단면 {info.single_cards}장<br/>양면 {info.dual_cards}장</li>
              <li>{date}</li>
              <li>{update_date}</li>
              <li><CategoryMoveModal category={this.props.category} bookTitle={info} bookCategoryMove={this.props.bookCategoryMove}/></li>
              <li>{renderLike()} </li>
              <li>{info.hide_or_show === true ? <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
                                                    <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></> : ''}
                </li>
              <li>{info.hide_or_show === false ? <EyeInvisibleOutlined onClick={()=>this.props.onClickHideOrShow({value:true,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>:
                                                  <EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>}</li>
              <li><DeleteBook bookTitle={info} bookDeleteHandler={this.props.bookDeleteHandler} /></li>
            </ul>
          </div> 
          : ''} 
        </> 
        }
      </>
     );
  }
}



class LikeSectionContent extends Component {
  render() { 
    console.log('like page_bookTitle:',this.props.bookTitle)
    console.log('like page_category:',this.props.category)
    if(this.props.bookTitle.length > 0){
      var bookList = this.props.bookTitle.map((book_title)=>(
        <LikeListContent key={book_title._id} 
                        category={this.props.category} 
                        bookCategoryMove={this.props.bookCategoryMove} 
                        bookInfo={book_title} 
                        listOrderHandler={this.props.listOrderHandler} 
                        changeBookTitleHandler={this.props.changeBookTitleHandler} 
                        bookDeleteHandler={this.props.bookDeleteHandler} 
                        onClickLike={this.props.onClickLike} 
                        onClickHideOrShow={this.props.onClickHideOrShow}
                        hideOrShowToggleState={this.props.hideOrShowToggleStateLike}/>
      ))
    } else {
      var bookList = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    
    
    return ( 
      <div className="like_list_container">
        <LikeListColumns hideOrShowClass={this.props.hideOrShowClass}
                        hideOrShowToggle={this.props.hideOrShowToggleHandeler}
                        />
        <div className="like_list_container_div">
          {bookList}
        </div>
      </div>
     );
  }
}
 
export default LikeSectionContent;