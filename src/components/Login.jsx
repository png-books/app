import React, { useState } from 'react';
import { Button, Card, Divider, Form, Input, Popover, Space, Typography } from 'antd';
import { LockOutlined, SmileOutlined } from '@ant-design/icons';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import animation from '../lotties/peekaboo.json';

const { Paragraph, Text, Title } = Typography;

const LoginForm = styled(Card)`
  background-color: #FFFAFA;
    border-radius: 10px;
    text-align: center;
    min-width: 35vw;

    h1 {
      padding: 10px 0px;
      background-color: #cbe7ff;
      border-radius: 10px 10px 0px 0px;
    }

    .ant-card-body {
      padding: 0px;
    }

    .tooltip {
        color: #0070CC;
        cursor: pointer;
        font-weight: bold;
    }
    .ant-typography {
      margin-bottom: 0px;
    }

    .secondary {
      color: rgba(0,0,0,0.6);
      font-size: small;
    }

    .info {
      transition: 
    }
`;

const Div = styled.div`
    width: 20vw;
    height: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.5);
    margin-bottom: 10px;
`;

const animationOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

function Login({ onLogin }) {
  const [error, setError] = useState('');
  const [valid, setValidation] = useState(false);
  const login = onLogin.bind(setError);
  
  const update = ({ target: { value } }) => {
    if (value.length) {
      setValidation(true);
    }
    setError('');
  }

  const tooltip = <Text>You know who you are.</Text>
  console.log(process.env.REACT_APP_DEFAULT_EMAIL);
  return (
    <LoginForm bordered={false}>
        <Title>Welcome</Title>
        <Lottie options={animationOptions} width={250}/>
        <Space align="center" direction="vertical" size="middle">
        <Paragraph>
          This app was designed for
            <Popover placement="top" content={tooltip}>
                <Text className="tooltip"> Seth</Text>.
            </Popover>
         </Paragraph>
        <Paragraph>
          If this isn't you, feel free to click away.<br/>
          <span class="secondary">
            Or don't. But this app is highly secure,<br/>
            so enjoy the login page <SmileOutlined/>
            </span>
        </Paragraph>
        <Div/>
        {error ? 
        <Text className="info" type="danger">{error}</Text>
        :
        <Text className="info">Enter the passphrase:</Text>
}
        <Form onFinish={login}>
          <Form.Item name="password" onChange={update}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button disabled={!valid} htmlType="submit">Enter</Button>
          </Form.Item>
        </Form>
        </Space>
        
        
    </LoginForm>
  )
}

export default Login;

