import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Popover, Space, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const { Paragraph, Text, Title } = Typography;

const LoginForm = styled(Card)`
    border-radius: 10px;
    text-align: center;

    .tooltip {
        color: blue;
        cursor: pointer;
    }
`;

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

  const tooltip = <Paragraph>Hello</Paragraph>

  return (
    <LoginForm bordered={false}>
      <Space align="center" direction="vertical" size="middle">
        <Title>Welcome</Title>
        <br />
        <Paragraph>
          This app was designed for
            <Popover placement="top" content={tooltip}>
                <Text className="tooltip"> Seth</Text>
            </Popover>
         </Paragraph>
        <Text>If this isn't you, feel free to click away.</Text>
        <Form onFinish={login}>
          <Form.Item name="password" onChange={update}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button disabled={!valid} htmlType="submit">Enter</Button>
          </Form.Item>
        </Form>
        <Paragraph type="danger">{error}</Paragraph>
      </Space>
    </LoginForm>
  )
}

export default Login;

