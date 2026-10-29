import Link from 'next/link';
import Counter from '@/components/Counter';
import CounterWithLog from '@/components/CounterWithLog';
import TimerToggle from '@/components/TimerToggle';
import CounterDashboard from '@/components/CounterDashboard';
import ContextCounterDisplay from '@/components/ContextCounterDisplay';
import ContextCounterButton from '@/components/ContextCounterButton';
import SimpleCounter from '@/components/SimpleCounter';
import Card from '@/components/Card';
import GreetingForm from '@/components/GreetingForm';

export default function HomePage() {
  return (
    <main className="p-8 text-zinc-900 dark:text-zinc-100">
      <h1>Witaj na naszej stronie głównej!</h1>
      <p>To jest pierwsza strona stworzona w Next.js z App Routerem.</p>
      <Link href="/about">Przejdź do strony O nas</Link>
      {' '}|{' '}
      <Link href="/style-guide">Zobacz Style Guide</Link>

      <h2>Krok 2: Counter (useState — count, step, isVisible)</h2>
        <Card title="Licznik odwiedzin">
          <Counter/>
        </Card>

      <h2>Instrukcja 05, Krok 5: GreetingForm</h2>
      <GreetingForm />

      <h2>Krok 3: CounterWithLog (useEffect)</h2>
      <CounterWithLog />

      <h2>Krok 4: TimerToggle (cleanup)</h2>
      <TimerToggle />

      <h2>Krok 5: CounterDashboard (lifting state up)</h2>
      <CounterDashboard />

      <h2>Krok 6: Context (ContextCounterDisplay + ContextCounterButton)</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Poniżej dwa <strong>osobne, niepowiązane propsami komponenty</strong> (dwa osobne pliki).
        Łączy je wyłącznie wspólny <code>CounterContext</code> z <code>layout.js</code>.
      </p>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] rounded-lg border-2 border-blue-600 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-950">
          <p className="m-0 font-bold text-blue-600 dark:text-blue-300">
            Plik: ContextCounterDisplay.js
          </p>
          <ContextCounterDisplay />
        </div>
        <div className="flex-1 min-w-[200px] rounded-lg border-2 border-green-600 bg-green-50 p-4 dark:border-green-400 dark:bg-green-950">
          <p className="m-0 font-bold text-green-600 dark:text-green-300">
            Plik: ContextCounterButton.js
          </p>
          <ContextCounterButton />
        </div>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Kliknij przycisk w zielonej ramce (ContextCounterButton) — wartość w niebieskiej ramce
        (ContextCounterDisplay) zmieni się automatycznie, mimo że to dwa różne komponenty.
      </p>

      <h2>Krok 8: Własny hook (SimpleCounter)</h2>
      <SimpleCounter />
    </main>
  );
}