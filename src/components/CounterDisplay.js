// CounterDisplay NIE ma własnego stanu — tylko ODBIERA `count` jako props od rodzica (CounterDashboard)
export default function CounterDisplay({ count }) {
  return <p>Aktualna wartość: {count}</p>;
}
