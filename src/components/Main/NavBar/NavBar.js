import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './Navbar.css';
import { NavLink} from 'react-router-dom';
import { HomeOutlined, ReadOutlined, FormOutlined, ShopOutlined,ShoppingCartOutlined,SolutionOutlined,UserOutlined,UserAddOutlined } from '@ant-design/icons';

const { Header } = Layout;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      current: 'home',
     }
  }

  handleClick = e => {
    this.setState({ current: e.key });
  };

  onClickLogoHandler = () => {
    this.setState({ current : "home"})
  }

  render(){
    const { current } = this.state;
    return (
      <Header>
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
                <NavLink to="/study" exact>학습</NavLink>
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
            <Menu onClick={this.handleClick} selectedKeys={[current]} theme="dark" mode="horizontal">
              <Menu.Item key="mail" icon={<UserOutlined />}>
                <NavLink to="/login">로그인</NavLink>
              </Menu.Item>
              <Menu.Item key="app" icon={<UserAddOutlined />}>
                <NavLink to="/register">회원가입</NavLink>
              </Menu.Item>
              <Menu.Item key="basket" icon={<ShoppingCartOutlined />}>
                <NavLink to="/basket" exact>장바구니</NavLink>
              </Menu.Item>
              <Menu.Item key="myinfo" icon={<SolutionOutlined />}>
                <NavLink to="/myinfo" exact>내정보</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      )
  }
}

export default NavBar