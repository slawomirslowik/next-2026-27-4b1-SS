'use client';

// CounterButtons NIE ma własnego stanu — ODBIERA `count` i `setCount` jako props od rodzica
// i wywołuje przekazany setter, żeby zmienić stan "mieszkający" w CounterDashboard
export default function CounterButtons({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Zwiększ</button>
      <button onClick={() => setCount(count - 1)}>Zmniejsz</button>
    </div>
  );
}
