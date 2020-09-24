import axios from 'axios';

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
          params: { key: auth.key, ...args},
          headers: headers
        }
    )
    .then(res => res.data)
    .then(err => err);
}

function search(query, cat="title") {
    return get(this, { q: query, search: cat });
};

const BookApi = {
    search: search.bind('search/')
}

export default BookApi;