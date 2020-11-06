import React, { Component } from 'react';
import axios from "axios"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  onClick = () => {
    fetch('api/user/user-auth',{
      method:'get',
      credentials:'include',
      mode: 'cors'
    })
       .then(res => console.log(res));
  }
  render() {
    return (
      <div className="main_page_container">
        메인
        <button onClick={this.onClick}>test</button>
      </div>
    );
  }
}

export default Home;