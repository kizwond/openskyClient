import React, { Component } from 'react';
import { Card} from 'antd';
// import axios from 'axios'
import { NavLink } from "react-router-dom";
import CategoryList from './CategoryList'

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      book_list: [
        {book_id: 'book1', title:"책1", description:"블라블라1", img:"/img/seaview.jpg"},
        {book_id: 'book2', title:"책2", description:"블라블라2", img:"/img/mountains.jpeg"},
        {book_id: 'book3', title:"책3", description:"블라블라3", img:"/img/mountaintrees.jpeg"},
        {book_id: 'book4', title:"책4", description:"블라블라4", img:"/img/books.jpg"},
        {book_id: 'book5', title:"책5", description:"블라블라5", img:"/img/seaview.jpg"},
      ]
     };
  }

  componentDidMount(){
    // axios.post('api/bookstore/req-book-sell',{
    //   book_id: '',
    // }).then(res => {
    //   console.log(res.data.book_list)
    //   this.setState({
    //     book_list: res.data.book_list
    //   })
    // })
  }
 
  onClickBook = (value) =>{
    console.log(`${value} clicked`)
    // window.location.href="/bookdetail"
  }
  onClickCategory = (item) =>{
    console.log(`${item} clicked`)
  }
  render() {  
    
    const book_list = this.state.book_list.map(book =>{
      return (
          <Card
            key={book.book_id}
            style={{ width: 240, height:'100%' }}
            onClick={() =>this.onClickBook(book.book_id)}
            cover={<img alt="책표지" width="200px" height="250px" src={book.img} />}
          >
            <NavLink to={{
                pathname:'/bookdetail',
                aboutProps:{
                  book_id:book.book_id
                 }
              }}>{book.title}</NavLink>
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