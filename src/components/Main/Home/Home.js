import React, { Component } from 'react';
import axios from "axios"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn:false
     };
  }
  componentDidMount() {
    axios.get('api/user/user-auth')
    .then(res => {
      if(res.data.isLoggedIn === true){
          this.setState({
            isLoggedIn:true
          })
      } else {
        this.setState({
          isLoggedIn:false
        })
      }  
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="main_page_container">
        메인
      </div>
    );
  }
}

export default Home;