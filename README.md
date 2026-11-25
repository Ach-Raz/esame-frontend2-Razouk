# Esame Frontend 2 — Razouk

Applicazione React e TypeScript per esplorare i film di *The Lord of the Rings* e consultare i dettagli di un film.

## Setup Progetto

### Librerie

- React ^19.3.1
- React DOM ^19.3.1
- React Router DOM ^7.18.7

### Dipendenze

- TypeScript ~7.0.2
- Vite ^8.3.6
- Plugin React per Vite ^6.1.2
- Oxlint ^1.90.0
- Tipi Node.js ^24.19.2
- Tipi React ^19.3.0
- Tipi React DOM ^19.3.0

## Struttura del progetto

```text
esame-frontend2-Razouk/
├── Documentazione/
│   └── M9_scheda-componente-semplificata_Achraf_Razouk.docx
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   └── Shell.tsx
│   ├── pages/
│   │   ├── MovieDetailPage.tsx
│   │   └── MovieListPage.tsx
│   ├── types/
│   │   └── movie.ts
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

# Esecuzione

1. nel file .env inserire la API KEY propria oppure sostituire ${API_KEY} in tutti i pages.
2. eseguire dal terminale pnpm dev
3. aprire local host nel browser con l'indirizzo generato
