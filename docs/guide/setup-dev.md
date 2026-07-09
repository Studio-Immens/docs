# Setup Ambiente di Sviluppo

> Guida per configurare il tuo ambiente per lavorare con i progetti Studio Immens.

## Prerequisiti

### 1. Node.js

Installa Node.js 20 LTS via [Volta](https://volta.sh) (consigliato):

```bash
curl https://get.volta.sh | bash
volta install node@20
volta install pnpm@latest
```

### 2. Git

```bash
git config --global user.name "Tuo Nome"
git config --global user.email "tua@email.com"
git config --global init.defaultBranch main
```

### 3. pnpm

```bash
volta install pnpm@latest
# Verifica
pnpm --version  # ≥ 9.0.0
```

## Clonare un Progetto

```bash
git clone https://github.com/studio-immens/<repo>.git
cd <repo>
pnpm install
pnpm dev          # Avvia dev server
```

### Progetti monorepo

Alcuni progetti usano pnpm workspace:

```bash
pnpm install              # Installa tutte le dipendenze
pnpm --filter <pkg> dev   # Avvia un pacchetto specifico
pnpm build                # Build di tutti i pacchetti
```

## Verifica Setup

Esegui i test per assicurarti che tutto funzioni:

```bash
pnpm test          # Unit test
pnpm test:e2e      # Test E2E (se presenti)
pnpm lint          # Linting
pnpm typecheck     # TypeScript type check
```

## Editor Consigliato

### VS Code + Estensioni

- **Biome** — Linting e formattazione
- **Tailwind CSS IntelliSense** (per progetti che lo usano)
- **Prettier** — Formattazione alternativa
- **GitLens** — Git superpowers
- **Error Lens** — Errori inline

### Oppure Neovim (vedi .files)

Se preferisci Neovim, il repo `.files` contiene la configurazione completa di Studio Immens.

## Troubleshooting

### Errore: `pnpm: command not found`

```bash
npm install -g pnpm
# o via Volta:
volta install pnpm
```

### Errore: `The engine "node" is incompatible`

Usa la versione corretta di Node:

```bash
volta pin node@20
```

### Cache pnpm corrotta

```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

## Link utili

- [pnpm Documentation](https://pnpm.io/motivation)
- [Volta](https://volta.sh)
- [Conventional Commits](https://www.conventionalcommits.org/)
