# La Chatte - Strona "W Budowie"

Elegancka strona informacyjna dla przyszłego sklepu internetowego z kosmetykami i lakierami do paznokci.

**Domena:** frameworkstudio.pl → www.frameworkstudio.pl

## 🎨 Funkcje

- **Design czarno-srebrny/platynowy** - luksusowa paleta kolorów
- **Tryb jasny/ciemny** - automatyczne dostosowanie do preferencji przeglądarki
- **Responsywny design** - działa na wszystkich urządzeniach
- **Formularz newslettera** - zapis do listy mailingowej z walidacją email
- **Modal współpracy biznesowej** - formularz kontaktowy do wysyłki wiadomości
- **Animacje** - płynne przejścia i interaktywne elementy (Motion/Framer Motion)
- **Social media** - linki do Instagram, Facebook i Email

## 📂 Struktura projektu

```
la-chatte/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Główny komponent
│   │   ├── components/
│   │   │   ├── ContactModal.tsx # Modal formularz kontaktowy
│   │   │   └── NewsletterForm.tsx # Formularz newslettera
│   │   └── utils/
│   │       └── colorThemes.ts   # Definicja palet kolorów
│   ├── imports/
│   │   ├── Logo_La_chatte_a4-01.png # Logo jasne
│   │   └── Logo_La_chatte_a4-02.png # Logo ciemne
│   └── styles/                  # Pliki CSS
├── public/
│   ├── _redirects              # Konfiguracja przekierowań (Netlify)
│   ├── robots.txt              # SEO - robots
│   └── site.webmanifest        # PWA manifest
├── netlify.toml                # Konfiguracja Netlify
├── vercel.json                 # Konfiguracja Vercel
├── .gitignore                  # Git ignore
├── .nvmrc                      # Wersja Node.js
└── package.json                # Zależności npm
```

## 🚀 Deployment do GitHub + Netlify/Vercel

### Krok 1: Przygotowanie repozytorium GitHub

1. Stwórz nowe **publiczne** repozytorium na GitHub (np. `la-chatte-landing`)

2. W terminalu (w katalogu projektu):

```bash
# Inicjalizacja git (jeśli jeszcze nie zrobione)
git init

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "Initial commit: La Chatte landing page"

# Ustaw main jako główną gałąź
git branch -M main

# Połącz z repozytorium GitHub (zamień na swój URL)
git remote add origin https://github.com/TWOJ-USERNAME/la-chatte-landing.git

# Wypchnij kod
git push -u origin main
```

### Krok 2A: Deploy na Netlify (ZALECANE)

1. Zaloguj się na [netlify.com](https://netlify.com)

2. Kliknij **"Add new site"** → **"Import an existing project"**

3. Wybierz **GitHub** i połącz swoje konto

4. Wybierz repozytorium `la-chatte-landing`

5. Ustawienia build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 (automatycznie wykryje z `.nvmrc`)

6. Kliknij **"Deploy site"**

7. Po zakończeniu deployu, przejdź do **"Domain settings"**:
   - Dodaj domenę: `www.frameworkstudio.pl`
   - Dodaj również: `frameworkstudio.pl` (przekierowanie jest już skonfigurowane)

8. Skonfiguruj DNS w swoim dostawcy domeny:
   - Dla Netlify dostaniesz adresy DNS lub CNAME
   - Przykład:
     ```
     A Record: @ → 75.2.60.5 (IP Netlify - sprawdź aktualne)
     CNAME: www → your-site.netlify.app
     ```

### Krok 2B: Deploy na Vercel (Alternatywa)

1. Zaloguj się na [vercel.com](https://vercel.com)

2. Kliknij **"Add New"** → **"Project"**

3. Import repozytorium z GitHub

4. Ustawienia (zazwyczaj auto-wykrywa):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Kliknij **"Deploy"**

6. Po deployu, przejdź do **Settings** → **Domains**:
   - Dodaj `www.frameworkstudio.pl`
   - Dodaj `frameworkstudio.pl`

7. Skonfiguruj DNS:
   ```
   A Record: @ → 76.76.21.21 (IP Vercel - sprawdź aktualne)
   CNAME: www → cname.vercel-dns.com
   ```

### Krok 3: Konfiguracja domeny frameworkstudio.pl

W panelu swojego dostawcy domeny (np. OVH, home.pl, nazwa.pl):

**Dla Netlify:**
- Typ: `A`, Host: `@`, Wartość: `75.2.60.5` (lub IP podane przez Netlify)
- Typ: `CNAME`, Host: `www`, Wartość: `your-site.netlify.app`

**Dla Vercel:**
- Typ: `A`, Host: `@`, Wartość: `76.76.21.21` (lub IP podane przez Vercel)
- Typ: `CNAME`, Host: `www`, Wartość: `cname.vercel-dns.com`

**Przekierowanie frameworkstudio.pl → www.frameworkstudio.pl** jest automatycznie obsługiwane przez konfigurację w `/netlify.toml` lub `/vercel.json`

⏱️ Propagacja DNS może zająć do 24-48 godzin.

## 🛠️ Rozwój lokalny

```bash
# Instalacja zależności (pnpm, npm lub yarn)
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny (katalog dist/)
npm run build

# Podgląd buildu lokalnie
npm run preview
```

## 📦 Technologie

- **React 18** - biblioteka UI
- **TypeScript** - typowanie statyczne
- **Tailwind CSS v4** - framework stylów
- **Motion (Framer Motion 12)** - animacje i interakcje
- **Vite 6** - bundler i dev server
- **Lucide React** - zestaw ikon

## 📧 Integracja z backendem (TODO)

Obecnie formularze (newsletter i kontakt) **symulują** wysyłanie wiadomości (setTimeout). Aby podłączyć prawdziwy backend:

### Opcja 1: EmailJS (najprostsze)
1. Zarejestruj się na [emailjs.com](https://www.emailjs.com/)
2. Zainstaluj: `npm install @emailjs/browser`
3. Dodaj kod w `ContactModal.tsx` i `NewsletterForm.tsx`:
```typescript
import emailjs from '@emailjs/browser';

emailjs.send('service_id', 'template_id', formData, 'public_key')
  .then(() => setStatus('success'))
  .catch(() => setStatus('error'));
```

### Opcja 2: Netlify Forms (dla Netlify)
Dodaj atrybut `netlify` do formularza:
```tsx
<form netlify name="contact" onSubmit={handleSubmit}>
```

### Opcja 3: Własny backend API
- Node.js + Express + Nodemailer
- Supabase Edge Functions
- Vercel Serverless Functions

### Opcja 4: Formspree
1. Zarejestruj się na [formspree.io](https://formspree.io)
2. Zmień action formularza na endpoint Formspree

## 🔐 Zmienne środowiskowe (jeśli potrzebne)

Stwórz plik `.env` w głównym katalogu:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Pamiętaj: `.env` jest w `.gitignore` - nie commituj go!

## 📱 Social Media - Aktualizacja linków

W pliku `/src/app/App.tsx` znajdź sekcję Social Media i zmień `href`:

```tsx
{ Icon: Instagram, href: 'https://instagram.com/lachatte', label: 'Instagram' },
{ Icon: Facebook, href: 'https://facebook.com/lachatte', label: 'Facebook' },
{ Icon: Mail, href: 'mailto:kontakt@frameworkstudio.pl', label: 'Email' }
```

## 📊 Analityka (opcjonalnie)

Dodaj Google Analytics lub Plausible do monitorowania ruchu:

**Google Analytics:**
Dodaj do `index.html` (jeśli istnieje) lub stwórz komponent analytics:
```typescript
// src/app/utils/analytics.ts
export const initGA = () => {
  // Google Analytics initialization
};
```

## 🎯 Checklist przed uruchomieniem produkcyjnym

- [ ] Zaktualizuj linki social media
- [ ] Podłącz formularz do prawdziwego backendu
- [ ] Dodaj favicon (obecnie placeholder)
- [ ] Skonfiguruj domenę frameworkstudio.pl
- [ ] Przetestuj na urządzeniach mobilnych
- [ ] Sprawdź czasy ładowania (Lighthouse)
- [ ] Dodaj Google Analytics / Plausible
- [ ] Przetestuj formularze na produkcji
- [ ] Sprawdź przekierowanie frameworkstudio.pl → www
- [ ] Dodaj certyfikat SSL (automatycznie na Netlify/Vercel)

## 📄 Licencja

© 2026 La Chatte. Wszystkie prawa zastrzeżone.

---

**Kontakt do wsparcia technicznego:** [dodaj email]