import Link from 'next/link';
import Card from '@/components/Card';

export default function AboutPage() {
  return (
    <main className="p-8 text-zinc-900 dark:text-zinc-100">
      <h1>O nas</h1>
      <Card title="Nasza misja">
        <h2>------------------------------------------------</h2>
        <p>Dowiedz się więcej o naszej szkolnej inicjatywie!</p>
      </Card>
      <Link href="/">Przejdź do strony głównej</Link>
    </main>
  );
}