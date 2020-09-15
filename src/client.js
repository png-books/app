import axios from 'axios';

const path = process.env.REACT_APP_SERVER;

export async function uploadFiles(files) {
    const data = new FormData();
    for(let i = 0; i < files.length; i++) {
        data.append('file', files[i].data)
        data.append('years', files[i].year || 0);
    }
    return axios
        .post(`${path}/upload`, data, {})
        .then(res => res.data)
        .catch(err => err.response.data || err);
}

export default {
    uploadFiles
}


