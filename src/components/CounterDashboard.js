'use client';

import { useState } from 'react';
import CounterDisplay from './CounterDisplay';
import CounterButtons from './CounterButtons';

export default function CounterDashboard() {
  const [count, setCount] = useState(0); // stan "mieszka" TYLKO tutaj, w rodzicu

  return (
    <div style={{ border: '1px dashed #999', padding: '1rem', marginTop: '0.5rem' }}>
      {/* DANE PŁYNĄ W DÓŁ: przekazujemy count jako props do dziecka */}
      <CounterDisplay count={count} />

      {/* ZMIANY PŁYNĄ W GÓRĘ: dziecko dostaje setCount i może wywołać go, by zmienić stan rodzica */}
      <CounterButtons count={count} setCount={setCount} />
    </div>
  );
}
