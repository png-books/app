// imports
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { open } from 'sqlite';
//const sqlite3 = require("sqlite3").verbose();
import textract from 'textract';

import api  from './bookapi.js';

// status codes
const OK = 200;
const BAD_REQUEST = 400;
const SERVER_ERR = 500;

class AppError extends Error {
  constructor(message, code=SERVER_ERR) {
    super(message);
    this.code = code;
  }
}

class ParsingError extends AppError {
  constructor(fileName) {
    super(`Failed to parse ${fileName}`, BAD_REQUEST);
  }
}

const app = express();
app.use(cors());

function parseFile(file) {
  console.log(file);
  const configs = { preserveLineBreaks: true };
  const fileContents = function(resolve, reject) {
    textract.fromBufferWithMime(
      file.mimetype,
      file.buffer,
      configs,
      function(error, text) {
        if (error) {
          console.log(error);
          reject(new ParsingError(file.originalname));
        } else {
          resolve(text.split('\n'));
        }
      }
    );
  }
  return new Promise(fileContents);
}

async function fetchData(arr) {
  const res = await api.search(arr.pop());
  return res;
}

app.post('/upload', multer().array('file'), async (req, res) => {
  try {
    const dataArray = {};
    for (let i = 0; i < req.files.length; i++) {
      const fileContents = await parseFile(req.files[i]);
      console.log("here", fileContents);
      dataArray[req.body.years[i]] = fileContents;
    }
    res.status(OK).json(dataArray);
  } catch (err) {
    res.status(err.code || SERVER_ERR).json({"error": err.message});
  }
});

async function runSql(statement, params) {
  let db = await open({
    filename: 'zoomingo.db',
    driver: sqlite3.Database
  });
  let data;
  if (statement.startsWith("SELECT")) {
    data = await db.all(statement, params);
  } else {
    data = db.run(statement, params);
    data = (await data).lastID;
  }
  await db.close();
  return data.length == 1 ? data.pop() : data;
}


app.listen(8000, function () {
  console.log('App running on port 8000');
});