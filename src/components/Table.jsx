import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import firebase from '../firebase';
import d3 from 'd3';

const stringFilter = (value, record) => record.author.startsWith(value);

const Data = styled(Table)`
    background-color: grey;
`;
function DataTable({data}) {
    const columns = [
        { 
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        { 
            title: 'Genre',
            dataIndex: 'genre'
        },
        {
            title: 'Year Last Read',
            dataIndex: 'last-year'
        }   
    ]
    return (
        <Table dataSource={data}></Table>
    )
};

export default DataTable;