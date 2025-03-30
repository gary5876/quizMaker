// src/App.js
import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import Quiz from './components/Quiz';

function App() {
  const [text, setText] = useState('');
  const [problems, setProblems] = useState([]);
  const [mode, setMode] = useState('upload'); // 'upload', 'quiz'

  const handleTextReceived = async (newText) => {
    setText(newText);

    // 문제 생성 요청
    const res = await fetch('http://localhost:5000/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    });

    const data = await res.json();
    setProblems(data.problems);
    setMode('quiz');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {mode === 'upload' && (
        <>
          <h1>문제 생성기</h1>
          <FileUploader onTextReady={handleTextReceived} />
        </>
      )}

      {mode === 'quiz' && <Quiz problems={problems} />}
    </div>
  );
}

export default App;
