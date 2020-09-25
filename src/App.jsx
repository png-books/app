import React, { useState } from 'react';
import { Layout, Menu,  PageHeader, Space } from 'antd';
import { CopyrightOutlined, DeploymentUnitOutlined, GithubOutlined } from '@ant-design/icons';
import { DataPage, LoginPage, MainPage, SideMenu } from './components';
import firebase from './firebase';
import 'antd/dist/antd.css';
import "./app.css";

function Page({ pageContent, title }) {
  return (
    <Layout.Content className="container">
      <PageHeader ghost={false}>{title}</PageHeader>
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
    content: <Page title="Data Visualizations" pageContent={<DataPage/>}/>
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

function App() {
  const [auth, setAuth] = useState(firebase.isAuthorized());
  const [currentPage, updatePage] = useState('main');
  const[error, setError] = useState('');
  console.log(auth);

  async function handleAuthChange({ password }) {
    try {
      if (!auth) {
        await firebase.login(process.env.REACT_APP_DEFAULT_EMAIL, password)
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
      <Layout.Footer>
      <div><DeploymentUnitOutlined/> <span class="invisible">rebeccabol/png-books</span></div>
        <div><CopyrightOutlined/>2020 Rebecca Bol</div>
        <div><GithubOutlined/> rebeccabol/png-books </div>
        </Layout.Footer>
    </Layout>
  );
}

export default App;