import React, { useState } from 'react';
import axios from 'axios';

function FileUploader({ onTextReady }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert('파일을 선택해 주세요.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const extractedText = res.data.text;
      setResponse(res.data.message);
      onTextReady(extractedText);  // 부모 컴포넌트로 텍스트 전달

    } catch (err) {
      setResponse('업로드 실패 😢');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <input type="file" accept=".txt,image/*" onChange={handleChange} />
      <br /><br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? '처리 중...' : '업로드 및 문제 생성'}
      </button>
      {response && <p>{response}</p>}
    </div>
  );
}

export default FileUploader;
