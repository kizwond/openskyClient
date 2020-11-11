import React from 'react';
import { Layout, Menu, Row, Col, Modal, Button  } from 'antd';
import './Navbar.css';
import { NavLink} from 'react-router-dom';
import { HomeOutlined, ReadOutlined, FormOutlined, ShopOutlined,ShoppingCartOutlined,SolutionOutlined,UserOutlined,UserAddOutlined } from '@ant-design/icons';
import axios from 'axios'
import Login from '../../Account/Login'

const { Header } = Layout;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      current: 'home',
      isLoggedIn : false,
      visible:false
     }
  }

  handleClick = e => {
    this.setState({ current: e.key });
  };

  onClickLogoHandler = () => {
    this.setState({ current : "home"})
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
  onClick = () => {
    axios('api/user/logout')
       .then(res => {this.setState({isLoggedIn:res.data.isLoggedIn})});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      isLoggedIn:true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onStudyClick = () => {
    document.getElementById("nav_bar").classList.add('nav_bar_hidden');
  }
  

  render(){
    const { current } = this.state;
    console.log('isloggedIn? :',this.state.isLoggedIn)
    return (
        <Row>
          <Col flex="1 1 300px">
          <span className="logo">
            <NavLink to="/" exact><img src="img/logo_white.png" onClick={this.onClickLogoHandler} key="home" alt="logo"/></NavLink>
          </span>
            <Menu onClick={this.handleClick} selectedKeys={[current]} theme="dark" mode="horizontal">
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <NavLink to="/" exact>메인</NavLink>
              </Menu.Item>
              <Menu.Item key="study" icon={<ReadOutlined />}>
                <NavLink to="/study" exact onClick={this.onStudyClick}>학습</NavLink>
              </Menu.Item>
              <Menu.Item key="write" icon={<FormOutlined />}>
                <NavLink to="/write" exact>만들기</NavLink>
              </Menu.Item>
              <Menu.Item key="book_store" icon={<ShopOutlined />}>
                <NavLink to="/store" exact>서점</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
          <Col flex="0 1 430px">
            <Menu onClick={this.handleClick} selectedKeys={[current]} style={{textAlign:'right'}} theme="dark" mode="horizontal">
            {this.state.isLoggedIn
                ? <>
                    <Menu.Item key="logout" icon={<ShoppingCartOutlined />}>
                      <NavLink to="/" onClick={this.onClick}>로그아웃</NavLink>
                    </Menu.Item>
                    <Menu.Item key="basket" icon={<ShoppingCartOutlined />}>
                      <NavLink to="/basket" exact>장바구니</NavLink>
                    </Menu.Item>
                    <Menu.Item key="myinfo" icon={<SolutionOutlined />}>
                      <NavLink to="/myinfo" exact>내정보</NavLink>
                    </Menu.Item>
                  </>
                : <>
                  <Menu.Item key="mail" icon={<UserOutlined />}>
                    <NavLink to="#" onClick={this.showModal}>로그인</NavLink>
                    <Modal
                      title={null}
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={null}
                      closable={false}
                      className="login_modal"
                    >
                      <Login onOk={this.handleOk} />
                    </Modal>
                  </Menu.Item>
                  <Menu.Item key="app" icon={<UserAddOutlined />}>
                    <NavLink to="/register">회원가입</NavLink>
                  </Menu.Item>
                </>
              }
              
              
            </Menu>
          </Col>
        </Row>
      )
  }
}

export default NavBar