import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AutoComplete, Button, Layout, Space, Tabs, Tooltip, Typography } from 'antd';
import { 
  PlusOutlined as AddIcon,
  ArrowLeftOutlined as BackIcon, 
  SettingOutlined as ConfigureIcon,
  EditOutlined as EditIcon,
  CloseOutlined as ExitIcon,
  UploadOutlined as UploadIcon } from '@ant-design/icons';
import firebase from '../firebase';
import DataTable from './Table';
import FileUpload from './FileUpload';
import AddData from './AddTab';
const { TabPane } = Tabs;

const Page = styled.div`
  background-color: #fffafa;
  height: 100%;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .toolbar {
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .ant-tabs-tabpane {
    height: 100%;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

function ActionButton({action, icon}) {
  return (
    <Button icon={icon} onClick={action} shape="circle" type="primary"/>
  );
}

const defaultPage = "default";

function Main() {
  const data = [];
  const [pageState, setPageState] = useState("add");
  const [editing, updateEditingState] = useState(false);
  function updatePageState() {
    updateEditingState(this === "edit");
    setPageState(this || defaultPage);
  }

  function addData(itemsToAdd) {
    firebase.add(itemsToAdd);
    setPageState(defaultPage);
  }

  const items = {
    "add": <AddIcon/>,
    "edit": <EditIcon/>,
    "upload": <UploadIcon/>,
    "configure": <ConfigureIcon/>
  };



  return (
    <Page className="page">
      <Space className="toolbar" size="large">
          <Space>
          {Object.keys(items).map(key => (
            <Tooltip key={key} position="bottom" title={key}>
              <ActionButton action={updatePageState.bind(key)} icon={items[key]}/>
            </Tooltip>
          ))}
        </Space>
        {pageState !== "default" && <ActionButton action={updatePageState.bind(defaultPage)} icon={editing ? <ExitIcon/> : <BackIcon/>}/>}
      </Space>
      <Tabs activeKey={pageState} animate={true}>
        <TabPane key={defaultPage}>
          <DataTable data={data} editable={editing}/>
        </TabPane>
        <TabPane key="add">
          <AddData data={data} onSubmit={addData}/>
        </TabPane>
        <TabPane key="upload">
          <div>Hello</div>
        </TabPane>
        <TabPane key="configure">
          <FileUpload/>
        </TabPane>
      </Tabs>
    </Page>
  );
}

export default Main;