import firebase from './firebase';
import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import Login from './components/Login';
import "antd/dist/antd.css";
import "./app.css";
import { Layout, Button } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const { Header, Footer, Content } = Layout;

function App() {
  const [isAuthorized, authorize] = useState(false);
  const [error, setError] = useState('');
  const login = e => {
    if (firebase.success(e.target.result)) {
      authorize(true);
    } else {
      setError("Login failure.");
    }
  }
  const logout = () => {
    authorize(false);
  }
  return (
    <Router>
      <Layout>
        {isAuthorized &&
          <Header>
            <Link to="/">Home</Link>
            <Link to="/import">Users</Link>
            <Button onClick={logout}>Logout</Button>
          </Header>
        }
        <Content className="container">
          <Switch>
            <Route path="/import">
              <FileUpload />
            </Route>
            <Route path="/">
              {isAuthorized ? <div>Hello</div> : <Login errorMessage={error} onSubmit={login} />}
            </Route>
          </Switch>
        </Content>
        <Footer>Hi</Footer>
      </Layout>

    </Router>
  );
}

export default App;