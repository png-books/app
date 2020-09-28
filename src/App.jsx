import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, PageHeader } from 'antd';
import 'antd/dist/antd.css';
import { CopyrightOutlined, DeploymentUnitOutlined, GithubOutlined } from '@ant-design/icons';

import firebase from './firebase';
import { DataPage, LoginPage, MainPage, SideMenu } from './components';

import "./app.css";

const MainContainer = styled(Layout)`
  background: none;
  height: 100vh;

  header, main, footer {
    width: 100vw;
  }

  header {
    height: 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    overflow: hidden;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  footer {
    display: flex;
    justify-content: space-between;
    height: 2%;
    padding: 0px;
  }

  main.auth {
    height: 92%;
    background: rgba(255,255,255,0.4);
  }

  .ant-page-header {
    width: 100%;
    background: none;
    font-family: 'Roboto Slab', serif;
    text-transform: uppercase;
    font-size: calc(10px + 1.5vmin);
    padding: 0px 20px;
  }

  header > button {
    margin-right: 1vw;
  }

  .ant-page-header-content {
    padding-top: 0px;
  }

  .invisible {
    display: hidden;
  }

`;

function Navbar({ onLogout, pages, setPage }) {
  return (
    <Layout.Header>
      <Menu onClick={e => setPage(e.key)} mode="horizontal" theme="dark">
        {pages.map(page => (
          <Menu.Item key={page.label}>{page.label}</Menu.Item>
        ))}
      </Menu>
      <SideMenu onLogout={onLogout} />
    </Layout.Header>
  );
}

function Page({ title, content }) {
  return (
    <Layout.Content className={title && "auth"}>
      {title && <PageHeader>{title}</PageHeader>}
      {content}
    </Layout.Content>
  )
}

function Footer() {
  return (
    <Layout.Footer>
      <div><DeploymentUnitOutlined /> <span class="invisible">rebeccabol/png-books</span></div>
      <div><CopyrightOutlined />2020 Rebecca Bol</div>
      <div><GithubOutlined /> rebeccabol/png-books </div>
    </Layout.Footer>
  );
}

const pages = [{
  label: "List View",
  content: <Page title="Your Book List" content={<MainPage />} />
},
{
  label: "Charts",
  content: <Page title="Data Visualizations" content={<DataPage />} />
}
];

function App({ fn }) {
  const [auth, authorize] = useState(true);
  const [currentPage, updatePage] = useState(0);

  const updateAuth = (state) => () => authorize(state);

  const login = (password, errorForm) => fn(firebase.login, updateAuth(true), errorForm, process.env.REACT_APP_DEFAULT_EMAIL, password);
  const logout = () => fn(firebase.logout, updateAuth(false));
  const tryThis = ({ password }) => fn(firebase.login, () => console.log("success"), console.error, process.env.REACT_APP_DEFAULT_EMAIL, password);

  return (
    <MainContainer>
      {auth && <Navbar pages={pages} setPage={updatePage} onLogout={logout} />}
      {auth ? pages[currentPage].content : (<Page content={<LoginPage onLogin={login} />} />)}
      {!auth && <Footer />}
    </MainContainer>
  );
}

export default App;