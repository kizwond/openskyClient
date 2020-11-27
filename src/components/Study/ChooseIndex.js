import React, { Component } from 'react';
import axios from "axios"
import { Row, Col, Divider,Alert } from 'antd';
import BookTitleList from './BookTitleList'


class ChooseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books:[],
     }
  }

  componentDidMount() {
    this.getOnlyShowTitle()
  }
  getOnlyShowTitle() {
    axios.post('api/study/get-index').then(res => {
      console.log(res.data)
      this.setState({
        books:res.data.book_and_index_list
      })
    })
  }

  render() {
    const style = { background: '#d0eaff', padding: '8px 0' };

    // console.log('log props:', this.props.location.selectedBook.value)
    if(this.state.books){
      console.log(this.state.books)
    }
    
    return (
      <div style={{width:"90%", margin:"auto"}}>
        <Alert message="Success Text" type="success" style={{backgroundColor:"#d0eaff", margin:"10px 0", border:"1px dashed #8478ff"}} />
        <Row gutter={1} justify="center">
          <Col className="gutter-row" span={10}>
            <BookTitleList books={this.state.books}/>
          </Col>
          <Col className="gutter-row" span={7}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={7}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseIndex;