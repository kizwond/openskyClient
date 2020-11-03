import React, { Suspense } from 'react';
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
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout className="layout">
        <Header>
          <Affix offsetTop={0}>
            <NavBar />
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
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}><img src="img/logo.png" className="opensky_logo" alt="logo"/> Copyright © OpenSKY Corp. All Rights Reserved.</Footer>
      </Layout>
    </Suspense>
  );
}

export default App;
