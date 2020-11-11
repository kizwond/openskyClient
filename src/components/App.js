import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./Main/NavBar/NavBar";
import { Layout, Affix } from 'antd';
import './App.css'
import Register from './Account/Register'
import Login from './Account/Login'
import Home from './Main/Home/Home'
import Study from './Study/Study'
import Write from './Write/Write'
import Store from './Store/Store'
import BookNaming from './Write/BookEditing/BookNaming'
import BookWriting from './Write/BookEditing/BookWriting'

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout className="layout">
        <Header className='nav_bar' id='nav_bar'>
          <Affix offsetTop={0}>
            <NavBar/>
          </Affix>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/study" component={Study} />
            <Route exact path="/write" component={Write} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/naming" strict component={BookNaming} />
            <Route exact path="/writing" strict component={BookWriting} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center',display:'block' }}><img src="img/logo.png" className="opensky_logo" alt="logo"/> Copyright © OpenSKY Corp. All Rights Reserved.</Footer>
      </Layout>
    </Suspense>
  );
}

export default App;
