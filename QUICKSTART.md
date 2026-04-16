# 🚀 Szybki start - La Chatte

## Deploy w 5 minut

### 1. Push do GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TWOJ-USERNAME/la-chatte.git
git push -u origin main
```

### 2. Deploy na Netlify

1. Wejdź na [netlify.com](https://netlify.com)
2. **Add new site** → **Import from Git**
3. Wybierz repozytorium GitHub
4. Settings:
   - Build: `npm run build`
   - Publish: `dist`
5. **Deploy**

### 3. Dodaj domenę

**Netlify Dashboard** → **Domain settings**:
- Dodaj: `www.frameworkstudio.pl`
- Dodaj: `frameworkstudio.pl`

**W panelu domeny (OVH/home.pl/inna):**
- `A Record`: `@` → `75.2.60.5` (IP z Netlify)
- `CNAME`: `www` → `twoja-strona.netlify.app`

### 4. Poczekaj na DNS (2-24h)

✅ Gotowe! Strona działa na frameworkstudio.pl

---

## Aktualizacja zawartości

### Zmiana logo
Zamień pliki w `/src/imports/`:
- `Logo_La_chatte_a4-01.png` (jasne)
- `Logo_La_chatte_a4-02.png` (ciemne)

### Social Media
W `/src/app/App.tsx` linia ~197:
```tsx
{ Icon: Instagram, href: 'https://instagram.com/lachatte' },
{ Icon: Facebook, href: 'https://facebook.com/lachatte' },
{ Icon: Mail, href: 'mailto:kontakt@frameworkstudio.pl' }
```

### Podłączenie newslettera/kontaktu
Wybierz jedną opcję:

**A) EmailJS (recommended):**
```bash
npm install @emailjs/browser
```
Zarejestruj się na [emailjs.com](https://emailjs.com), skopiuj dane i użyj w komponentach.

**B) Netlify Forms:**
Dodaj `netlify` do formularzy w kodzie.

**C) Własny backend:**
Stwórz API endpoint i zamień `setTimeout` na `fetch()`.

---

## Troubleshooting

**Strona nie działa po deploy:**
- Sprawdź logi budowania w Netlify/Vercel
- Upewnij się że `npm run build` działa lokalnie

**Domena nie działa:**
- Sprawdź DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Poczekaj 24-48h

**Formularze nie działają:**
- Obecnie są na mock data (setTimeout)
- Podłącz EmailJS lub backend (patrz wyżej)

**Błędy node_modules:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

Need help? Zobacz pełny [README.md](./README.md)
