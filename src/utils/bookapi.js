import axios from 'axios';
import { xmlToJson } from './parser';

const base = 'https://cors-anywhere.herokuapp.com/https://goodreads.com/';
const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
};
const auth = {
    key: `${process.env.REACT_APP_GOODREADS_KEY}`,
    secret: `${process.env.REACT_APP_GOODREADS_SECRET}`
};


function get(url, args) {
    return axios.get(base + url,
        {
            params: { key: auth.key, ...args },
            headers: headers
        }
    )
        .then(res => res.data)
        .then(data => new DOMParser().parseFromString(data, 'text/xml'))
        .then(xml => xmlToJson(xml))
        .then(res => res.GoodreadsResponse)
        .catch(err => err);
}


function search(query, cat = "title") {
    return get(this, { q: query, search: cat });
};

function getAuthor(authorId) {
    return get(this, { id: authorId });
}

const BookApi = {
    search: search.bind('search/'),
    author: getAuthor.bind('api/author_url/')
}

export default BookApi;