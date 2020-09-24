import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, AutoComplete, Button, Input, List, Tag, Typography } from 'antd';

import { StarFilled as Star } from '@ant-design/icons';
import BookAPI from '../api/bookapi';
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

    .
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

    useEffect(() => {
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
    
    function makeListItem(object) {
        const { id, author, small_image_url, title, average_rating} = object.best_book;
        const year = object.original_publication_year;

        const label = `${title} - ${author.name}`;
        const labelYear = !year.nil ? `(${year})` : '';

        tempList[id] = { ...object.best_book, year, label };

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
        <AutoComplete open={currentSearch} options={results} onChange={updateSearch} onSelect={selectItem} notFoundContent="No results">
            <Input.Search size="large" placeholder="Search books..." />
        </AutoComplete>
        <div>
            {selectedItems.map(id => (
                <Tag closable onClose={unselectItem.bind(id)}>{tempList[id].label}</Tag>
            ))}
        </div>
        <Button onClick={onFinish}>
            Add Books
        </Button>
        </>
    )
};

export default AddForm;