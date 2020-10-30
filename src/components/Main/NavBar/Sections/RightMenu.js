/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { ShoppingCartOutlined, SolutionOutlined } from '@ant-design/icons';

import {NavLink} from 'react-router-dom'

function RightMenu(props) {

  // if (user.userData && !user.userData.isAuth) {
    return (
      <Menu onClick={props.onClick} theme="dark" mode={props.mode}>
        <Menu.Item key="mail">
          <NavLink to="/login">Signin</NavLink>
        </Menu.Item>
        <Menu.Item key="app">
          <NavLink to="/register">Signup</NavLink>
        </Menu.Item>
      {/* </Menu>
    )
  } else {
    return (
      <Menu onClick={props.onClick} selectedKeys={props.selectedKeys} theme="dark" mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={console.log('logout will be added')}>Logout</a>
        </Menu.Item> */}
        <Menu.Item key="basket" icon={<ShoppingCartOutlined />}>
          <NavLink to="/basket" exact>Basket</NavLink>
        </Menu.Item>
        <Menu.Item key="myinfo" icon={<SolutionOutlined />}>
         <NavLink to="/myinfo" exact>Myinfo</NavLink>
        </Menu.Item>
      </Menu>
    )
  // }
}

export default withRouter(RightMenu);

