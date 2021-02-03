import React, { Component } from 'react';
import CategoryList from './CategoryList'
import { Button } from 'antd'

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(this.props.location.aboutProps);
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
                                <div>책제목 : </div>
                                <div>저자 : </div>
                                <div>가격 : ₩ 000,000</div>
                            </div>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                                <Button size="small" style={{fontSize:'11px', width:"200px", borderRadius:"5px"}}>장바구니담기</Button>
                                <Button size="small" style={{fontSize:'11px', width:"200px", borderRadius:"5px"}}>구매하기</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{borderTop:"1px solid lightgrey", marginTop:"30px", padding:"10px"}}>책 상세정보</div>
                </div>
            </div>
         );
    }
}
 
export default BookDetail;