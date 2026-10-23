"use client"; // <--- ВОТ ЭТА МАГИЧЕСКАЯ СТРОКА

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '20px', 
      border: '1px solid #444', 
      borderRadius: '10px',
      display: 'inline-block'
    }}>
      <h2>Интерактивный счетчик</h2>
      <p>Текущее значение: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#e50914',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Нажми меня
      </button>
    </div>
  );
}