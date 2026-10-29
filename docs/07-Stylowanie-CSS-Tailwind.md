# Stylowanie — CSS, CSS Modules i Tailwind CSS

W tym bloku nauczysz się różnych sposobów stylowania aplikacji Next.js: globalnych arkuszy CSS, modułowych stylów (**CSS Modules**) oraz frameworka **Tailwind CSS**, który jest już skonfigurowany w tym projekcie.

---

## Krok 0: Nowa podstrona na potrzeby ćwiczeń — `/style-guide`

Wszystkie przykłady z tej instrukcji będziemy dodawać na **osobnej podstronie**, a nie na stronie głównej — dzięki temu strona główna zostaje czysta, a efekty stylowania łatwo zobaczyć w jednym miejscu.

Utwórz plik `src/app/style-guide/page.js`:

```jsx
export default function StyleGuidePage() {
  return (
    <main className="p-8 text-zinc-900 dark:text-zinc-100">
      <h1>Style Guide — przykłady stylowania</h1>
      <p>Ta strona służy do ćwiczeń z instrukcji 07 (CSS, CSS Modules, Tailwind).</p>
    </main>
  );
}
```

Dodaj link do niej ze strony głównej (`src/app/page.js`), np. obok linku do `/about`:

```jsx
import Link from 'next/link';

<Link href="/style-guide">Zobacz Style Guide</Link>
```

Odwiedź pod adresem `http://localhost:3000/style-guide`, aby sprawdzić, czy strona działa. Kolejne kroki będą rozbudowywać właśnie tę podstronę.

---

## Krok 1: Style globalne

Plik `src/app/globals.css` zawiera style dotyczące całej aplikacji (np. reset CSS, zmienne kolorów). Jest importowany raz, w `src/app/layout.js`:

```jsx
import "./globals.css";
```

Dodaj własną regułę na końcu pliku `globals.css`:

```css
.highlight {
  background-color: #fff59d;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
```

Użyj klasy w komponencie podstrony `src/app/style-guide/page.js`:

```jsx
<span className="highlight">Ważna informacja</span>
```

---

## Krok 2: CSS Modules — style lokalne dla komponentu

CSS Modules pozwalają pisać style, które **nie kolidują** z innymi komponentami (nazwy klas są automatycznie unikalne).

Utwórz plik `src/components/Card.module.css`:

```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
```

Zaktualizuj `src/components/Card.js`:

```jsx
import styles from './Card.module.css';

export default function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

> Nazwa pliku modułu CSS **musi** kończyć się na `.module.css`.

---

## Krok 3: Tailwind CSS — stylowanie narzędziowe (utility-first)

Ten projekt ma już skonfigurowany Tailwind (`postcss.config.mjs`). Zamiast pisać własne klasy CSS, używasz gotowych klas narzędziowych bezpośrednio w JSX.

Utwórz nowy plik komponentu `src/components/Badge.js`:

```jsx
export default function Badge({ children }) {
  return (
    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      {children}
    </span>
  );
}
```

Samo utworzenie komponentu nic jeszcze nie pokaże na stronie — trzeba go **zaimportować i wywołać**, np. na podstronie `src/app/style-guide/page.js`:

```jsx
import Badge from '@/components/Badge';

// ...wewnątrz JSX, np. pod istniejącą treścią:
<p>
  Status: <Badge>Nowość</Badge> <Badge>Tailwind CSS</Badge>
</p>
```

Po zapisaniu obu plików odśwież stronę `/style-guide` w przeglądarce — powinieneś zobaczyć niebieską "plakietkę" (badge) z tekstem.

### Najczęściej używane klasy Tailwind

| Kategoria | Przykładowe klasy |
|---|---|
| Odstępy | `p-4`, `px-2`, `py-1`, `m-4`, `gap-4` |
| Flexbox | `flex`, `flex-col`, `items-center`, `justify-between` |
| Kolory | `bg-blue-500`, `text-white`, `border-zinc-200` |
| Typografia | `text-lg`, `font-bold`, `leading-8` |
| Zaokrąglenia i cienie | `rounded-lg`, `shadow-md` |
| Warianty (dark mode, hover) | `dark:bg-black`, `hover:bg-blue-600` |

---

## Krok 4: Porównanie podejść — kiedy używać czego?

- **Style globalne** – reset, zmienne, style typografii dla całej strony.
- **CSS Modules** – gdy chcesz mieć pełną kontrolę nad CSS i unikać kolizji nazw klas, ale bez narzutu utility-first.
- **Tailwind CSS** – szybkie prototypowanie, spójny design system, mniej przełączania się między plikami.

W praktyce projekty często **łączą** te podejścia.

---

## Krok 5: Warianty i responsywność w Tailwind

Dodaj responsywny układ do podstrony `src/app/style-guide/page.js` — jedna kolumna na telefonie, dwie na większym ekranie:

```jsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <Card title="Punkt 1">Treść 1</Card>
  <Card title="Punkt 2">Treść 2</Card>
</div>
```

Prefiksy `sm:`, `md:`, `lg:` aktywują style dopiero od danej szerokości ekranu.

---

## Krok 6: Ręczny przełącznik trybu dark/light

Do tej pory wariant `dark:` (użyty np. w komponencie `Badge`) reagował wyłącznie na **systemowe ustawienie motywu** (`prefers-color-scheme`), zdefiniowane w `globals.css` przez regułę:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

Oznacza to, że użytkownik nie miał żadnego wpływu na motyw w samej aplikacji — żeby zobaczyć tryb ciemny, trzeba było zmienić ustawienia systemu Windows/przeglądarki.

Aby umożliwić **ręczne przełączanie** motywu (niezależnie od ustawień systemowych), trzeba zmienić podejście z "media query" na "klasę CSS":

### 6.1. Włącz wariant `dark` oparty o klasę (Tailwind v4)

W Tailwind v4 (bez pliku `tailwind.config.js`) dodaje się tzw. custom variant bezpośrednio w CSS. Na górze `globals.css` dodaj:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

Dzięki temu klasy `dark:*` zadziałają tylko wtedy, gdy znacznik `<html>` (lub jego rodzic) ma klasę `dark` — a nie na podstawie ustawień systemu.

Zmień też regułę z `@media (prefers-color-scheme: dark)` na selektor `.dark`:

```css
.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

### 6.2. Komponent `DarkModeToggle`

Utwórz plik `src/components/DarkModeToggle.js` — to komponent **kliencki** (`'use client'`), bo korzysta ze stanu i API przeglądarki (`localStorage`, `window.matchMedia`):

```jsx
'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-800 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      aria-label="Przełącz tryb jasny/ciemny"
    >
      {isDark ? '☀️ Jasny' : '🌙 Ciemny'}
    </button>
  );
}
```

Przy pierwszym wejściu na stronę motyw nadal jest dopasowany do ustawień systemowych (`prefers-color-scheme`), ale po kliknięciu przycisku wybór użytkownika jest zapamiętywany w `localStorage` i ma pierwszeństwo przy kolejnych odwiedzinach.

### 6.3. Podpięcie przełącznika globalnie w `layout.js` i uniknięcie "mignięcia" motywu

Aplikacja ma być **spójna i w całości dark-aware** — przełącznik oraz efekt trybu ciemnego mają obowiązywać na **każdej** stronie, a nie tylko wybranej podstronie. Dlatego `DarkModeToggle` dodajemy w **wspólnym** `src/app/layout.js`, a nie w pojedynczym pliku `page.js`:

```jsx
import DarkModeToggle from '@/components/DarkModeToggle';
import Script from 'next/script';

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
        {children}
      </body>
    </html>
  );
}
```

> **Dlaczego to działa?** Skrypt w `<head>` wykonuje się przed wyrenderowaniem treści `<body>`, więc klasa `dark` jest ustawiona na `<html>` od razu — bez migotania. Komponent `DarkModeToggle` jedynie synchronizuje swój stan (`isDark`) z tym, co już ustawił skrypt, i pozwala użytkownikowi zmienić motyw w dowolnym momencie — **na każdej podstronie aplikacji**, bo `layout.js` otacza wszystkie strony.

> ⚠️ **Uwaga — błąd hydracji (`A tree hydrated but some attributes...`):** serwer renderuje `<html>` **bez** klasy `dark`, a nasz skrypt dodaje ją w przeglądarce **zanim** React zdąży zhydrować stronę. React widzi więc różnicę między tym, co sam wyrenderował, a tym, co faktycznie jest w DOM, i zgłasza ostrzeżenie w konsoli. To nic nie psuje (atrybut `class` i tak zostaje poprawnie ustawiony), ale żeby pozbyć się komunikatu, dodaj `suppressHydrationWarning` na tagu `<html>` — mówi to Reactowi "wiem, że ten element może się różnić po stronie klienta, zignoruj to":
>
> ```jsx
> <html lang="pl" suppressHydrationWarning>
> ```

### 6.4. Dlaczego po dodaniu przełącznika "nic się nie zmienia"?

Po podpięciu przycisku 🌙/☀️ okazuje się, że sam przycisk się pojawia i klasa `dark` faktycznie trafia na `<html>` (można to sprawdzić w DevTools), ale **żaden komponent nie zmienia wyglądu**. Powód jest prosty: dodanie klasy `dark` do `<html>` **nic samo z siebie nie przestylowuje** — reaguje na nią wyłącznie CSS, który Ty sam napiszesz z użyciem wariantu `dark:` (Tailwind) albo selektora `.dark ...` (zwykły CSS). Jeśli komponent nie ma żadnej takiej reguły, to w trybie ciemnym wygląda dokładnie tak samo jak w jasnym.

Druga, częstsza pułapka: **inline style zawsze wygrywa z klasą CSS**. Jeśli element ma jednocześnie `style={{ background: '#f0f0f0' }}` i `className="dark:bg-zinc-900"`, to `dark:bg-zinc-900` nigdy się nie wyświetli — inline `style` ma wyższy priorytet w CSS niż jakakolwiek klasa.

```jsx
{/* ❌ Nie zadziała — inline style zawsze wygrywa z klasą */}
<header style={{ background: '#f0f0f0' }} className="dark:bg-zinc-900">
  ...
</header>

{/* ✅ Działa — wszystko jako klasy Tailwind */}
<header className="bg-zinc-100 dark:bg-zinc-900">
  ...
</header>
```

**Co zrobić, żeby komponent reagował na tryb ciemny?**

1. Znajdź w komponencie inline style'y (`style={{ ... }}`) i zamień je na klasy Tailwind, np.:

   ```jsx
   // przed
   <main style={{ padding: '2rem' }}>

   // po
   <main className="p-8 text-zinc-900 dark:text-zinc-100">
   ```

2. Do każdej klasy koloru/tła dopisz wariant `dark:` z odpowiednio dobranym kolorem, np. `text-blue-600 dark:text-blue-400`, `border-zinc-200 dark:border-zinc-700`. **Nie poprzestawaj na samej ramce** — jeśli zmienisz tylko kolor obramowania, efekt będzie ledwo widoczny. Dodaj też kontrastowe **tło**, np.:

   ```jsx
   // przed — zmienia się tylko ramka, tło zlewa się z resztą strony
   <div className="rounded-lg border-2 border-blue-600 p-4 dark:border-blue-400">

   // po — wyraźnie widoczne tło w obu trybach
   <div className="rounded-lg border-2 border-blue-600 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-950">
   ```

3. Jeśli komponent korzysta z **CSS Modules** (np. `Card.module.css`), dodaj osobną regułę dla trybu ciemnego, korzystając z globalnego selektora `:global(.dark)`. Warto nadać kartom **inne tło niż tło całej strony** (np. jasnoszare na jasnym motywie, ciemnoszare — ale jaśniejsze niż tło strony — na ciemnym), żeby karta wizualnie "odcinała się" od strony:

   ```css
   .card {
     background: #f9fafb; /* jasnoszare tło karty, różne od białego tła strony */
     color: var(--foreground);
     border: 1px solid #ddd;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
   }

   /* reaguje, gdy <html> ma klasę .dark */
   :global(.dark) .card {
     background: #27272a;   /* ciemnoszare, jaśniejsze niż tło strony (#0a0a0a) */
     border-color: #3f3f46;
     color: #ededed;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
   }
   ```

   Zmienna `--foreground` (zdefiniowana w `globals.css`) automatycznie zmienia wartość, gdy `<html>` ma klasę `.dark` — dlatego dla samego koloru tekstu wystarczy `var(--foreground)`. Dla **tła** karty lepiej jednak podać konkretny, inny odcień niż `var(--background)` strony — inaczej karta "zniknie" na tle strony i widoczna będzie tylko zmiana ramki.

4. Przejrzyj **wszystkie** miejsca w aplikacji (np. `src/app/page.js`, `src/app/about/page.js`, `src/app/style-guide/page.js`), które mają twarde kolory w inline `style` (`color: '#555'`, `border: '2px solid #2563eb'` itp.) — każde z nich trzeba świadomie zamienić na klasy Tailwind z wariantem `dark:`. Dzięki temu cała aplikacja jest **spójna** i w całości dark-aware, a nie tylko pojedyncza podstrona.

   W tym projekcie poprawiono w ten sposób m.in.:
   - `src/app/layout.js` — tło nagłówka (`bg-zinc-100 dark:bg-zinc-900`) i kolor tekstu w `nav`,
   - `src/app/page.js` — `<main>`, opisy (`text-zinc-600 dark:text-zinc-400`) oraz boksy `ContextCounterDisplay`/`ContextCounterButton` z kontrastowym tłem (`bg-blue-50 dark:bg-blue-950`, `bg-green-50 dark:bg-green-950`),
   - `src/app/about/page.js` — `<main>` ze spakowanymi klasami Tailwind zamiast inline `style`,
   - `src/app/style-guide/page.js` — `<main>` z wariantem `dark:`.

> 💡 **Wniosek:** ręczny przełącznik motywu (klasa `dark` na `<html>`) to tylko "włącznik" — resztę pracy (czyli to, co faktycznie się zmienia) musisz zaimplementować osobno w każdym komponencie, który ma wyglądać inaczej w trybie ciemnym. Żeby efekt był **czytelny**, zmieniaj nie tylko ramkę, ale przede wszystkim **tło** i **kolor tekstu**. Ponieważ przełącznik znajduje się w `layout.js`, dotyczy to **całej aplikacji**, a nie jednej podstrony.

---

## Szybka checklista

- [ ] Utworzona podstrona `src/app/style-guide/page.js` i link do niej ze strony głównej
- [ ] Dodana własna reguła w `globals.css` i użyta na podstronie `/style-guide`
- [ ] Utworzony `Card.module.css` i podpięty do komponentu `Card`
- [ ] Utworzony komponent `Badge` stylowany w Tailwind i wywołany na podstronie `/style-guide`
- [ ] Wypróbowany responsywny grid z prefiksami `sm:`/`md:`
- [ ] Dodany ręczny przełącznik `DarkModeToggle` w `layout.js` — dostępny na **każdej** podstronie
- [ ] Skrypt antymigotaniowy w `layout.js` dodany przez `next/script` (`strategy="beforeInteractive"`) + `suppressHydrationWarning` na `<html>`
- [ ] Cała aplikacja (`/`, `/about`, `/style-guide`, `layout.js`) jest spójnie dark-aware — wszędzie użyto klas `dark:` zamiast inline `style`
- [ ] Każdy komponent, który ma reagować na tryb ciemny, ma zmienione **tło i kolor tekstu** (nie tylko ramkę)

---

## Materiały

- Next.js — CSS: <https://nextjs.org/docs/app/building-your-application/styling/css>
- Next.js — CSS Modules: <https://nextjs.org/docs/app/building-your-application/styling/css#css-modules>
- Tailwind CSS — dokumentacja: <https://tailwindcss.com/docs>
