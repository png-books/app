import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Space, Tooltip, Typography } from 'antd';
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

function Login({ errorMessage, onSubmit }) {
    console.log(errorMessage);
    return (
        <LoginForm bordered={false}>
            <Space align="center" direction="vertical" size="middle">
                <Title>Welcome</Title>
                <br />
                <Paragraph>
                    This app was designed for
                     <Tooltip placement="top" title="me?">
                        <Text className="tooltip"> Seth</Text>
                    </Tooltip>.
                    </Paragraph>
                <Text>If this isn't you, feel free to click away.</Text>
                <Form onFinish={onSubmit}>
                    <Form.Item name="password">
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">Enter</Button>
                    </Form.Item>
                </Form>
                <Paragraph type="danger">{errorMessage}</Paragraph>
            </Space>
        </LoginForm>
    )
}

export default Login;

