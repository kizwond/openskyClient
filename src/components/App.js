import React, { Suspense } from 'react';
import { Switch } from "react-router-dom";
import NavBar from "./Main/NavBar/NavBar";
import { Layout, Affix } from 'antd';
import './App.css'
const { Header, Content, Footer } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

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

          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}><img src="img/logo.png" className="opensky_logo" alt="logo"/> Copyright © OpenSKY Corp. All Rights Reserved.</Footer>
      </Layout>
    </Suspense>
  );
}

export default App;
