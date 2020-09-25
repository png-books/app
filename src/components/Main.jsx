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
const { Title } = Typography;

const Page = styled.div`
  background-color: #fffafa;
  height: 100%;
  padding: 10px;
  margin: 0px 24px;
  display: flex;
  flex-direction: column;

  .toolbar {
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .ant-tabs {
    height: 100%;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ant-tabs-tabpane-active {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .attr {
    width: 100%;
    text-align: left;
  }
`;

function ActionButton({action, icon}) {
  return (
    <Button icon={icon} onClick={action} shape="circle" type="primary"/>
  );
}

const defaultPage = "default";

async function getBooks() {
  try {
    const res = await firebase.get();
    console.log(res);
  } catch(err) {
    console.log(err);
  }
}

function Main() {
  const data = [];
  getBooks();
  const [pageState, setPageState] = useState(defaultPage);
  const [editing, updateEditingState] = useState(false);
  function updatePageState() {
    updateEditingState(this === "edit");
    setPageState(this === "edit" ? defaultPage : this);
  }

  async function addData(itemsToAdd) {
    await firebase.add(itemsToAdd);
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
          <FileUpload/>
        </TabPane>
        <TabPane key="configure">
          <div class="attr">
            <Title level={1}>Attributes</Title>
            <Title level={3}>Title, author, genre, etc.</Title>
            <br/>
            <Title level={1}>Default Sorting</Title>
            <Title level={3}>Select a default attribute to see table sorted by</Title>
            <br/>
            <Title level={1}>Suggestions?</Title>
          </div>
        </TabPane>
      </Tabs>
    </Page>
  );
}

export default Main;