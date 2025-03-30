import React from 'react';

function ResultPage({ results, onRetryAll, onRetryWrong, onBackToHome }) {
  const total = results.length;
  const correct = results.filter(r => r.isCorrect).length;
  const wrong = results.filter(r => !r.isCorrect);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div
        style={{
          backgroundColor: '#a06666',
          padding: '30px',
          borderRadius: '20px',
          color: 'white',
          fontSize: '20px',
          marginBottom: '30px'
        }}
      >
        다 풀었습니다! <br />
        정답률: {correct} / {total}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {/* 전체 다시 풀기 */}
        <button
          onClick={onRetryAll}
          style={{
            backgroundColor: 'limegreen',
            padding: '20px',
            borderRadius: '10px',
            fontSize: '18px'
          }}
        >
          🔄 다시풀기
        </button>

        {/* 오답만 다시풀기 */}
        <button
          onClick={() => onRetryWrong(wrong)}
          style={{
            backgroundColor: 'khaki',
            padding: '20px',
            borderRadius: '10px',
            fontSize: '18px'
          }}
        >
          ❗ 오답 다시 ({wrong.length}/{total})
        </button>

        {/* 처음으로 */}
        <button
          onClick={onBackToHome}
          style={{
            backgroundColor: 'tomato',
            padding: '20px',
            borderRadius: '10px',
            fontSize: '18px'
          }}
        >
          🏠 처음으로
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
