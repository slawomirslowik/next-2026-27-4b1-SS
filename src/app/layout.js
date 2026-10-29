import { CounterProvider } from '@/context/CounterContext';
import DarkModeToggle from '@/components/DarkModeToggle';
import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var shouldBeDark = stored ? stored === 'dark' : prefersDark;
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <header className="bg-zinc-100 p-4 dark:bg-zinc-900">
          <nav className="flex items-center justify-between text-zinc-900 dark:text-zinc-100">
            <strong>Moja Aplikacja Szkolna</strong>
            <DarkModeToggle />
          </nav>
        </header>
        <CounterProvider>
          {children}
        </CounterProvider>
      </body>
    </html>
  );
}