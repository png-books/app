import React, { useState } from 'react';
import { Layout, Menu,  PageHeader } from 'antd';
import { LoginPage, MainPage, SideMenu } from './components';
import firebase from './firebase';
import 'antd/dist/antd.css';
import "./app.css";

function Page({ pageContent, title }) {
  return (
    <Layout.Content className="container">
      <PageHeader>{title}</PageHeader>
      {pageContent}
    </Layout.Content>
  )
}

const pages = {
  'main': {
    label: "List View",
    content: <Page title="Your Book List" pageContent={<MainPage/>}/>
  },
  'data': {
    label: "Charts",
    content: <Page title="Data Visualizations" pageContent={<div>Hello</div>}/>
  }
};

function Navbar({ onLogout, setPage }) {
  return (
    <Layout.Header>
      <Menu onClick={e => setPage(e.key)} mode="horizontal" theme="dark">
        {Object.keys(pages).map(pid => (
          <Menu.Item key={pid}>{pages[pid].label}</Menu.Item>
        ))}
      </Menu>
      <SideMenu onLogout={onLogout} />
    </Layout.Header>
  );
}

const email = 'rjbol94@gmail.com';

function App() {
  const [auth, setAuth] = useState(firebase.isAuthorized() || true);
  const [currentPage, updatePage] = useState('main');
  const[error, setError] = useState('');

  async function handleAuthChange({ password }) {
    try {
      if (!auth) {
        await firebase.login(email, password)
      } else {
        await firebase.logout();
      }
      setAuth(!auth);
    } catch (err) {
      this(err.message);
    }
  }

  return (
    <Layout>
      {auth ?
      <>
        <Navbar setPage={updatePage} onLogout={handleAuthChange.bind(setError)}/>
        {pages[currentPage].content}
      </>
      :
      <Layout.Content>
        <LoginPage onLogin={handleAuthChange}/>
      </Layout.Content>
      }
      <Layout.Footer>©2020 Created by Rebecca Bol</Layout.Footer>
    </Layout>
  );
}

export default App;