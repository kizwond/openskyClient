import React, { Component } from 'react';
import { Card} from 'antd';
import axios from 'axios'
import { NavLink } from "react-router-dom";
import CategoryList from './CategoryList'

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      book_list: [ ]
     };
  }

  componentDidMount(){
    axios.get('api/bookstore/get-sellbooklist')
    .then(res => {
      console.log(res.data.sellbooklist)
      this.setState({
        book_list: res.data.sellbooklist
      })
    })
  }
 
  onClickBook = (book) =>{
    console.log(`${book.book_info.title} clicked`)
    // window.location.href="/bookdetail"
    sessionStorage.setItem('selectedBuyBook', JSON.stringify(book))
  }
  onClickCategory = (item) =>{
    console.log(`${item} clicked`)
  }
  render() {  
    
    const book_list = this.state.book_list.map(book =>{
      console.log(book)
      
      return (
          <Card
            key={book._id}
            style={{ width: 240, height:'100%' }}
            onClick={() =>this.onClickBook(book)}
            cover={<img alt="책표지" width="200px" height="250px" src="img/books.jpg" />}
          >
            <NavLink to={{
                pathname:'/bookdetail',
                aboutProps:{
                  book_id:book._id,
                 }
              }}>{book.book_info.title}</NavLink>
              <div>{book.book_info.author}</div>
              <div>{book.book_info.price}원</div>
          </Card>
      )
    })

    return (
      <div className="store_page_container" style={{display:"flex", flexDirection:"row", marginTop:"20px"}}>
        <div style={{width:"200px"}}>
        <CategoryList/>
        </div>
        <div style={{display:"flex", flexWrap:"wrap", width:"100%", justifyContent:"space-around"}}>
          {book_list}
        </div>
      </div>
    );
  }
}

export default Store;