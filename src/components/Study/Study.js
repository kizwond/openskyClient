import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Dropdown, Space } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import './Study.css'
const { Header, Content } = Layout;
const { SubMenu } = Menu;

class Study extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  onMenuClick = () => {
    document.getElementById("nav_bar").classList.remove('nav_bar_hidden');
    document.getElementById("nav_bar").classList.add('nav_bar');
  }
  render() {
    const menu_0 = (
      <Menu>
        <Menu.ItemGroup>
          <Menu.Item><NavLink to="/" exact onClick={this.onMenuClick}>메인</NavLink></Menu.Item>
          <Menu.Item><NavLink to="/write" exact onClick={this.onMenuClick}>만들기</NavLink></Menu.Item>
          <Menu.Item><NavLink to="/store" exact onClick={this.onMenuClick}>서점</NavLink></Menu.Item>
          <Menu.Item>로그아웃</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const menu_1 = (
      <Menu>
        <SubMenu title="카드 보기 모드"  trigger={['click']}>
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <Menu.ItemGroup>
          <Menu.Item>전체보기</Menu.Item>
          <Menu.Divider />
          <Menu.Item>앞/뒷면 바꾸기</Menu.Item>
          <Menu.Divider />
          <Menu.Item>보이기/순기기 설정</Menu.Item>
          <Menu.Divider />
          <Menu.Item>읽어주기 설정</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const menu_2 = (
      <Menu>
        <Menu.ItemGroup>
          <Menu.Item>앞/뒷면 서식 설정</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const menu_3 = (
      <Menu>
        <Menu.ItemGroup>
          <Menu.Item>ooooo</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    return (
      <div className="study_page_container">
        <Layout className="layout">
          <Header style={{background:'white', paddingLeft:10}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Dropdown overlay={menu_0} >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <AppstoreOutlined style={{marginRight:'100px'}}/>
                </a>
              </Dropdown>
              <div style={{display:'flex', width:'90%', flexDirection:'row', justifyContent:'space-between'}}>
              <Space size='large'>
                <Dropdown overlay={menu_1} >
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    보기
                  </a>
                </Dropdown>
                <Dropdown overlay={menu_2} >
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    서식
                  </a>
                </Dropdown>
                <Dropdown overlay={menu_3} >
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    학습
                  </a>
                </Dropdown>
              </Space>
              <Menu>
                  <Menu.Item>학습종료</Menu.Item>
                </Menu>
              </div>
            </div>
          </Header>
          <Content style={{ padding: '100px 50px' }}>
            <div className="site-layout-content">Content</div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Study;
