import React, { Component } from 'react';
import { EyeInvisibleOutlined, StarTwoTone, StarOutlined, EyeOutlined, ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';


class ListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     }
  }

  render() { 
    return ( 
      <div className="study_list_columns">
        <ul>
          <li>카테고리</li>
          <li>선택</li>
          <li>책이름</li>
          <li>학습완료율</li>
          <li>평균레벨</li>
          <li>최근학습일</li>
          <li>구분</li>
          <li>카드총합 ( 미학습 / 복습 / 완료 / 보류 / 졸업 )</li>
          <li>즐겨찾기</li>
          <li>순서이동</li>
          <li>숨긴책</li>
        </ul> 
      </div>
    );
  }
}


class ListContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 

     }
  }

  render() { 
    
    return ( 
      <>
       <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
          </ul>
        </div> 
      </>
     );
  }
}
class CategoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }
  render() {    
    return (

      <div className="study_each_category_container">
        <ListContent/>
      </div>

    );
  }
}

class ListSectionContent extends Component {
  render() { 
    
    return ( 
      <div className="study_list_container">
        <ListColumns />
        <CategoryListContainer/>
      </div>
     );
  }
}
 
export default ListSectionContent;