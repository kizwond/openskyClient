import React, { Component } from 'react';
import CategoryList from './CategoryList'
import DefaultButton from '../../styledComponents/defaultButton'
import axios from 'axios'

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    buyBookClick = (id) => {
        axios.post('api/bookstore/add-sellbook-to-mybook',{
            sellbook_id : id
        })
        .then(res => {
            console.log(res.data)
        })
    }
    render() { 
        const bookDetail = JSON.parse(sessionStorage.getItem("selectedBuyBook"))
        console.log(bookDetail)
        return ( 
            <div className="store_page_container" style={{display:"flex", flexDirection:"row", marginTop:"20px"}}>
                <div style={{width:"200px"}}>
                <CategoryList/>
                </div>
                <div style={{display:"flex", flexDirection:"column", width:"100%", marginLeft:"10px"}}>
                    <div style={{display:"flex", width:"100%", padding:"20px"}}>
                        <div style={{flex:1, borderRight:"1px dashed lightgrey", padding:"20px"}}>
                            <img src="/img/books.jpg" width="100%" alt="책표지"/>
                        </div>
                        <div style={{flex:1, display:"flex", flexDirection:"column", padding:"20px", justifyContent:"space-between"}}>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <div>책제목 : {bookDetail.book_info.title}</div>
                                <div>저자 : {bookDetail.book_info.author} </div>
                                <div>가격 : ₩ {bookDetail.book_info.price}원</div>
                                <div>출간일 : {bookDetail.book_info.time_created}</div>
                            </div>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                                <DefaultButton size="small" width="200px" style={{borderRadius:"5px"}}>장바구니담기</DefaultButton>
                                <DefaultButton size="small" onClick={() => this.buyBookClick(bookDetail._id)} width="200px" style={{borderRadius:"5px"}}>구매하기</DefaultButton>
                            </div>
                        </div>
                    </div>
                    <div style={{borderTop:"1px solid lightgrey", marginTop:"30px", padding:"10px"}}>
                        <div>책 상세정보</div>
                        <div>저자정보</div>
                        <div>{bookDetail.book_info.intro_author}</div>
                        <div>책 정보</div>
                        <div>{bookDetail.book_info.intro_book}</div>
                        <div>목차정보</div>
                        <div>{bookDetail.book_info.indexes}</div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default BookDetail;