import React, { useState } from 'react';

function Quiz({ problems }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = problems[index];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);
    setShowAnswer(false);
    setIndex(prev => prev + 1);
  };

  if (index >= problems.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>다 풀었습니다!</h2>
        <p>정답률: {correctCount} / {problems.length}</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <p>{current.question}</p>

      {!showAnswer && (
        <button onClick={() => setShowAnswer(true)}>정답 확인</button>
      )}

      {showAnswer && (
        <>
          <p><strong>정답:</strong> {current.answer}</p>
          <button onClick={() => handleAnswer(true)}>⭕</button>
          <button onClick={() => handleAnswer(false)}>❌</button>
        </>
      )}
    </div>
  );
}

export default Quiz;
