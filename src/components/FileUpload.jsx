import React, { useState, useEffect } from 'react';
import { Button, Divider, List, Row, Select, Space, Upload } from 'antd';
import { DeleteTwoTone, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';


const Component = styled.div`
    background-color: white;
    width: 50%;

    input {
        display: none;
    }

    .year-select {
        min-width: 25%;
    }

    .year-select * {
        cursor: pointer;
    }
`;

const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 50 }, (_, i) => {
    const year = currentYear - i;
    return (
        <Select.Option key={year} value={year}>
            {year}
        </Select.Option>
    )
});

class FieldData {
    constructor(file) {
        this.data = file;
        this.name = file.name;
        this.updateYear = this.updateYear.bind(this);
    }

    updateYear(year) {
        this.year = year;
    }
}

function FileUpload({ isLoading, onUpload, testData }) {
    const [fileData, setFileData] = useState([]);
    const selectFiles = e => {
        let fileList = [];
        for (const file of e.target.files) {
            const data = new FieldData(file);
            if (!fileData.find(f => f === data)){
                fileList.push(data);
            }
        }
        setFileData(fileData.concat(fileList));
    }
    
    const removeFile = file => {
        setFileData(fileData.filter(item => item !== file));
    }

    const submit = () => onUpload(fileData);

    return (
        <Component>
            
            <label className="ant-btn">
                <UploadOutlined />
                Select File(s)
                <input id="file-upload" multiple onChange={selectFiles} type="file"/> 
            </label>
            <List
                dataSource={fileData}
                renderItem={file =>
                    <Row align="middle">
                        <p>{file.name}</p>
                        <Select allowClear className="year-select" onChange={file.updateYear} value={file.year}>
                            {yearRange}
                        </Select>
                        <DeleteTwoTone onClick={() => removeFile(file)}/>
                    </Row>
                }
            />
            <Button disabled={!fileData.length} onClick={submit}>Upload</Button>
            <br/>
            <br/>
            {isLoading && <LoadingOutlined spin style={{ color: 'black' }}/>}
            {testData &&
            (<List
                dataSource={Object.keys(testData)}
                renderItem={year =>
                    <>
                        <Divider>{year || "None"}</Divider>
                        <List
                            dataSource={testData[year]}
                            renderItem={item => 
                                <p>{item}</p>
                            }
                        />
                    </>
                }
                />)
            }
        </Component>
    );
}

export default FileUpload;