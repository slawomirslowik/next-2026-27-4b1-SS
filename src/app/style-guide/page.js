import Card from '@/components/Card';
import Badge from '@/components/Badge';

export default function StyleGuidePage() {
  return (
    <main className="p-8 text-zinc-900 dark:text-zinc-100">
      <h1>Style Guide — przykłady stylowania</h1>
      <p>Ta strona służy do ćwiczeń z instrukcji 07 (CSS, CSS Modules, Tailwind).</p>

      <h2>Krok 1: Style globalne</h2>
      <p>
        To jest zwykły tekst, a tutaj mamy <span className="highlight">ważną informację</span> wyróżnioną globalną klasą CSS.
      </p>

      <h2>Krok 2: CSS Modules (komponent Card)</h2>
      <Card title="Przykładowa karta">
        Ta karta jest stylowana przez <code>Card.module.css</code>.
      </Card>

      <h2>Krok 3: Tailwind CSS (komponent Badge)</h2>
      <p>
        Status: <Badge>Nowość</Badge>{' '}
        <Badge>Tailwind CSS</Badge>
      </p>

      <h2>Krok 5: Responsywny grid Tailwind</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card title="Punkt 1">Treść 1 — karta stylowana CSS Modules.</Card>
        <Card title="Punkt 2">Treść 2 — responsywny grid Tailwind (1 kolumna na telefonie, 2 na większym ekranie).</Card>
      </div>
    </main>
  );
}
