'use client';

import { useState, useEffect } from 'react';

export default function CounterWithLog() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Licznik zmienił wartość na:', count);
  }, [count]); // efekt uruchamia się przy każdej zmianie "count"

  return (
    <div>
      <p>Wartość: {count}</p>
      <button onClick={() => setCount(count + 1)}>Zwiększ</button>
    </div>
  );
}
