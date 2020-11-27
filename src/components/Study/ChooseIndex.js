import React, { Component } from 'react';
import axios from "axios"
import { Row, Col, Divider,Alert } from 'antd';

class ChooseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books:[],
     }
  }

  componentDidMount() {
    // this.getOnlyShowTitle()
  }
  getOnlyShowTitle() {
    axios.post('api/study/get-index',{
      book_ids: this.props.location.selectedBook.value
    }).then(res => {
      console.log(res.data)
      this.setState({
        books:res.data.books
      })
    })
  }

  render() {
    const style = { background: '#d0eaff', padding: '8px 0' };

    console.log('log props:', this.props.location.selectedBook.value)
    return (
      <div style={{width:"90%", margin:"auto"}}>
        <Alert message="Success Text" type="success" style={{backgroundColor:"#d0eaff", margin:"10px 0", border:"1px dashed #8478ff"}} />
        <Row gutter={1} justify="center">
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseIndex;