import React, { useState } from 'react';
import { Avatar, Button, Drawer, Dropdown, Menu, Space } from 'antd';
import styled from 'styled-components';

import { UserOutlined } from '@ant-design/icons';

const SideMenuButton = styled.div`
    width: 50px;
    cursor: pointer;
    text-align: center;
`;

const B = styled(Button)`
    margin-right: 0px;
`;

function SideMenu({onLogout}) {
    const [isOpen, openPanel] = useState(false);
    const togglePanel = () => openPanel(!isOpen);
    
    const options = (
        <Menu theme="dark">
            <Menu.Item key="change password" onClick={togglePanel}>Change Password</Menu.Item>
            <Menu.Item key="logout" onClick={onLogout}>Logout</Menu.Item>
        </Menu>
    );
        console.log(isOpen)
    return (
        <>
    <Dropdown className="dropdown" overlay={options} placement="bottomCenter" trigger={["click"]}>
        <SideMenuButton>
            <Avatar icon={<UserOutlined/>}/>
        </SideMenuButton>
    </Dropdown>
        <Drawer width="30%" onClose={togglePanel} visible={isOpen}>
            <p>Hello</p>
        </Drawer>
    </>
    );
}

function LogoutButton({onLogout}) {

    return (
        <B onClick={onLogout} theme="dark">
            Logout
        </B>
    )
}

export default LogoutButton;