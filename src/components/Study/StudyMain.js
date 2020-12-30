import React, { Component } from 'react';
import StudyList from "./0-StudyList/StudyList"

class StudyMain extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className="study_main_container">
        <StudyList/>
      </div>
    );
  }
}

export default StudyMain;