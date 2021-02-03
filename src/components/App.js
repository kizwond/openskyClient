import React, { Suspense} from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./Main/NavBar/NavBar";
import { Layout, Affix } from 'antd';
import './App.css'
import Register from './Account/Register'
import Login from './Account/Login'
import Home from './Main/Home/Home'
import StudyMain from './Study/StudyMain'
import Write from './Write/Write'
import Store from './Store/Store'
import BookNaming from './Write/BookEditing/BookNaming'
// import BookWriting from './Write/BookEditing/BookWriting'
import BookEditing from './Write/BookEditing/BookEditing'
import ChooseIndex from './Study/1-ChooseIndex/ChooseIndex'
import StudyFlip from './Study/2-FlipMode/StudyFlip'
import MentoringMain from './Mentoring/MentoringMain'
import FinishStudy from './Study/FinishStudy'
import MyInfo from './Main/MyInfo/MyInfo'
import BookDetail from './Store/BookDetail'

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
            <Route exact path="/myinfo" component={MyInfo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/study" component={StudyMain} />
            <Route exact path="/write" component={Write} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/naming" component={BookNaming} />
            {/* <Route exact path="/writing" strict component={BookWriting} /> */}
            <Route exact path="/editing" component={BookEditing} />
            <Route exact path="/choose-index" component={ChooseIndex} />
            <Route exact path="/start-study" component={StudyFlip} />
            <Route exact path="/mentoring" component={MentoringMain} />
            <Route exact path="/study-result" component={FinishStudy} />
            <Route exact path="/bookdetail" component={BookDetail} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center',display:'block' }}><img src="img/logo.png" className="opensky_logo" alt="logo"/> Copyright © OpenSKY Corp. All Rights Reserved.</Footer>
      </Layout>
    </Suspense>
  );
}

export default App;
