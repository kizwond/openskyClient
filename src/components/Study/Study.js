import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Study.css'
const { Header, Content } = Layout;
const { SubMenu } = Menu;

class Study extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
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
          <Header style={{background:'white', paddingLeft:100}}>
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
