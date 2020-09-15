import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import "antd/dist/antd.css";
import axios from 'axios';
import client from './client';


function App() {
  const [data, setData] = useState();
  const [loading, loadingStatus] = useState(false);
  
  async function uploadFiles(files) {
    loadingStatus(true);
    const res = await client.uploadFiles(files);
    setData(res);
  }

  useEffect(() => {
    if (data) {
      loadingStatus(false);
    }
  }, [data]);

  const error = data && data.error;

  return (
    <div className="app">
        <FileUpload testData={!error && data} isLoading={loading} onUpload={uploadFiles}/>
        <p>{error}</p>
    </div>
  );
}

export default App;