import React, { Component } from 'react';
import axios from "axios"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  onClick = () => {
    axios('api/user/logout')
       .then(res => console.log(res));
  }
  render() {
    return (
      <div className="main_page_container">
        <button onClick={this.onClick}>로그아웃</button>
      </div>
    );
  }
}

export default Home;