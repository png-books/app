import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Popover, Space, Typography } from 'antd';
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
  max-height: 80vh;
  oveflow: scroll;

  .ant-card-head {
    padding: 0px 0px;
    background-color: #cbe7ff;
    border-radius: 10px 10px 0px 0px;
  }

  .ant-card-body {
    padding: 0px;
  }

  .ant-typography {
    margin-bottom: 0px;
  }

  .tooltip {
      color: #0070CC;
      cursor: pointer;
      font-weight: bold;
  }

  .secondary {
    color: rgba(0,0,0,0.6);
    font-size: small;
  }

  .img-container {
    height: ${props => props.imgSize}px;
    width: ${props => props.imgSize}px;
    text-align: center;
    margin-left: ${props => props.imgSize * 0.1}px;
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

const defaultMessage = "Enter the passphrase:";

function Login({ onLogin }) {
  const [animSize, updateAnimationSize] = useState(250);
  const [message, setMessage] = useState(defaultMessage);
  const [valid, setValidation] = useState(false);
  const login = p => onLogin(p, setMessage);

  useEffect(() => {
    window.addEventListener('resize', () => updateAnimationSize(window.innerHeight * .25))
  });

  const update = ({ target: { value } }) => {
    if (value.length) {
      setValidation(true);
    }
    setMessage(defaultMessage);
  }

  const tooltip = <Text>You know who you are.</Text>
  return (
    <LoginForm bordered={false} imgSize={animSize} title={<Title>Welcome</Title>}>
      <div class="img-container">
        <Lottie options={animationOptions} width={animSize} />
      </div>
      <Space align="center" direction="vertical" size="middle">
        <Paragraph>
          This app was designed for
            <Popover placement="top" content={tooltip}>
            <Text className="tooltip"> Seth</Text>.
            </Popover>
        </Paragraph>
        <Paragraph>
          If this isn't you, feel free to click away.<br />
          <span class="secondary">
            Or don't. But this app is highly secure,<br />
            so enjoy the login page <SmileOutlined />
          </span>
        </Paragraph>
        <Div />
        <Text type={message !== defaultMessage && "danger"}>{message}</Text>
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
