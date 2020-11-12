import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, Layout, Steps, Space, Spin, Typography } from 'antd';
import { FontSizeOutlined, FileSearchOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import BookAPI from '../utils/bookapi';
import Book from '../utils/Book';
import DataTable from './Table';

const steps = [
  { title: "Text Entry", icon: <FontSizeOutlined />, next: "Parse", instr: "Paste your existing book list in the field below." },
  { title: "Vertification", icon: <FileSearchOutlined />, next: "Import", instr: "Verify the entries below (you can always change this later)" },
  { title: "Success", icon: <FontSizeOutlined />, next: "Add More", instr: "" }
];

const { Text } = Typography;

const Content = styled.div`
  width: 80%;
  height: 100%;
  margin: 2%  auto;
  text-align: center;

  .ant-input-affix-wrapper {
    height: 100%;
  }

  textarea {
    height: 100% !important;
  }

`;

async function parseText(text) {
  const list = [];
  const entries = text.split('\n');
  for (const e of entries) {
    const items = e.split(/:/);
    const author = items[0];
    const res = await BookAPI.search(author, 'author');
    const b = new Book((await res).search.results.work);
    const r = await BookAPI.author(b.getAuthorId());
    console.log(res, b, r);
    //list.push(res);
  }
  return list;
}

async function importData(text) {
  console.log(text);
}

function StepContent({ data, loading, stepId, updateFn }) {
  if (loading) {
    return <Spin />
  }
  switch (stepId) {
    case 0:
      return <Input.TextArea allowClear autoSize={{ maxRows: 20 }} onChange={e => updateFn(e.target.value)} />;
    case 1:
      return <DataTable data={data} />;
    default:
      return <div>Goodbye</div>
  }
}

function ListParser() {
  const [currentStep, updateStep] = useState(0);
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  const [data, updateData] = useState('');

  useEffect(() => {
    console.log("here");
    async function loadNextStep() {
      try {
        const res = await (currentStep === 1 ? parseText(data) : importData(data));
        updateData([]);
      } catch (err) {
        setError(err.message);
      } finally {
        isLoading(false);
      }
    }
    if (currentStep !== 0) {
      isLoading(true);
      loadNextStep();
    }
  }, [currentStep]);

  const getStatus = i => i <= currentStep ? "done" : "wait";
  const nextStep = () => currentStep == steps.length - 1 ? updateStep(0) : updateStep(currentStep + 1);
  return (
    <>
      <Steps size="small">
        {steps.map((step, i) => (
          <Steps.Step status={getStatus(i)} title={step.title} icon={step.icon} />
        ))}
      </Steps>

      <Text className="instr">{steps[currentStep].instr}</Text>
      <Content>
        <StepContent loading={loading} stepId={currentStep} updateFn={updateData} />
      </Content>
      <Text type="danger">{error}</Text>
      <Button onClick={nextStep}>{steps[currentStep].next}</Button>

    </>
  );
}

export default ListParser;