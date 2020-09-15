import axios from 'axios';
import xml  from 'xml2json';

const base = 'https://goodreads.com/';
const headers = {"Content-Type": 'text/xml'};
const auth = {
    key: "xM3j4IKZsoAjp6aBGYJrA",
    secret: "XSzroA5v3hMQsCettyW6aryZIpgdqldhjijloIyTAo"
};

function get(url, args) {
    return axios.get(base + url, 
        {
          params: { key: auth.key, ...args},
          headers: headers
        }
    )
    .then(res => xml.toJson(res.data))
    .then(err => err);
}

function search(query, cat) {
    return get(this, { q: query });
};

const BookApi = {
    search: search.bind('search/')
}

export default BookApi;