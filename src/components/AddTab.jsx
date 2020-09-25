import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, AutoComplete, Button, Input, List, Tag, Typography } from 'antd';

import { StarFilled as Star } from '@ant-design/icons';
import BookAPI from '../api/bookapi';
import ellipsis from '../lotties/ellipsis.svg';
import { xmlToJson } from '../api/utils';

const { Text } = Typography;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .anticon {
        color: #FFC440;
    }

    .ant-typography {
        margin: 10px;
    }
`;

const Panel = styled.div`
    width: 50%;
    height: 30vh;
    margin-top: 25px;
    margin-bottom: 20px;
`;

const Search = styled(AutoComplete)`
    width: 80%;
`;

function ListItem(url, rating, label, year) {
    return (
        <Item>
            <div>
                <Avatar src={url} />
                <Text>{label}</Text>
                <Text>{year}</Text>
            </div>
            <div>
                <Text>{rating}</Text>
                <Star/>
            </div>
        </Item>
    )
    
}

var globalTimeout = null;  
var tempList = {};

function AddForm({data, onSubmit}) {
    const [currentSearch, updateSearch] = useState('');
    const [results, updateResults] = useState([]);
    const [selectedItems, selectItems] = useState([]);
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        setNoResult(false);
        if (globalTimeout != null) {
            clearTimeout(globalTimeout);
          }
          globalTimeout = setTimeout(function() {
            globalTimeout = null;
            if (currentSearch !== '') {
                fetchData(currentSearch);
            }
          }, 200);
    }, [currentSearch])

    useEffect(() => {
        if (results.length == 0 && globalTimeout == null) {
            setNoResult(true);
        }
    }, [results]);
    
    function makeListItem(object) {
        const { id, author, small_image_url, title, average_rating} = object.best_book;
        const year = object.original_publication_year;

        const label = `${title} - ${author.name}`;
        const labelYear = !year.nil ? `(${year})` : '';

        tempList[id] = { id, author: author.name, title, year, label };

        return {
            value: id,
            label: ListItem(small_image_url, average_rating, label, labelYear)
        }
    }
    async function fetchData(search) {
        try {
            const res = await BookAPI.search(search);
            var xml = new DOMParser().parseFromString(res, 'text/xml');
            const results = await xmlToJson(xml);
            const items = results.GoodreadsResponse.search.results.work.map(makeListItem);
            updateResults(items);
        } catch(err) {
            console.log(err);
            updateResults([]);
        }
    }

    function selectItem(val) {
        if ((data && !data.val) || !selectedItems.includes(val)) {
            const updated = selectedItems.concat(val);
            selectItems(updated);
            updateSearch('');
        } else {
            console.log("already selected");
        }
    }

    function unselectItem() {
        const val = this;
        selectItems(selectedItems.filter(i => i!== val));
        updateSearch('');
    }

    function onFinish() {
        onSubmit(selectedItems.map(val => tempList[val]));
    }
    
    return (
        <>
        <Search
            open={currentSearch}
            options={results}
            onChange={updateSearch}
            onSelect={selectItem}
            notFoundContent={noResult ? "No Result" : <img src={ellipsis} alt="loading" height="25"/>}
        >
            <Input.Search size="large" placeholder="Search books..." />
        </Search>
        <Panel>
            {selectedItems.map(id => (
                <Tag closable onClose={unselectItem.bind(id)}>{tempList[id].label}</Tag>
            ))}
        </Panel>
        <Button onClick={onFinish}>
            Add Books
        </Button>
        </>
    )
};

export default AddForm;