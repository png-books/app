const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-';

export async function uploadFiles1(files) {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append('file', files[i].data)
    data.append('years', files[i].year || 0);
  }
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
  }
  reader.readAsText(file);
}


export function randomString(length) {
  const randomInt = (min = 0, max = 1) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min);
  return Array.from({ length: length }).map(() => CHARS[randomInt(0, CHARS.length)]).join('');
}

export async function uploadFiles(fileData) {
  const dataArray = {};
  for (const file of fileData) {
    console.log(file);
    readFile(file.data);
    //dataArray[file.year] = await parseFile(file.data);
  }
  return dataArray;
}

export default {
  uploadFiles,
  randomString
}