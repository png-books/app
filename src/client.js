import axios from 'axios';

export async function uploadFiles(files) {
    const data = new FormData();
    for(let i = 0; i < files.length; i++) {
        data.append('file', files[i].data)
        data.append('years', files[i].year || 0);
    }
    return axios
        .post("http://localhost:8000/upload", data, {})
        .then(res => res.data)
        .catch(err => err.response.data);
}

export default {
    uploadFiles
}


