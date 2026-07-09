# Pubblicare un Pacchetto

> Guida per pubblicare un pacchetto npm su npm registry e/o GitHub Packages.

## Prerequisiti

- Un account [npmjs.com](https://www.npmjs.com)
- Autenticazione configurata:

```bash
npm login
pnpm login
```

- (Opzionale) GitHub Token con scope `read:packages` e `write:packages`

## Preparazione

### 1. Versionamento

Usiamo [Changesets](https://github.com/changesets/changesets) per versionamento automatico e changelog:

```bash
pnpm changeset
```

Questo comando ti guiderà nella scelta del tipo di bump:

- `major` — Breaking changes
- `minor` — Nuove feature (backward-compatible)
- `patch` — Bug fix (backward-compatible)

### 2. Build

```bash
pnpm build
# Verifica che la build sia corretta:
node -e "require('./dist')"
```

### 3. Verifica package.json

Controlla che `package.json` contenga:

```json
{
  "name": "@studio-immens/nome-pacchetto",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/style.css"
  },
  "files": ["dist"],
  "sideEffects": false
}
```

## Pubblicazione

### Su npm (pubblico)

```bash
pnpm publish --access public
```

### Su npm (privato)

```bash
pnpm publish --access restricted
```

### Su GitHub Packages

Nel `package.json`, aggiungi:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

Poi:

```bash
pnpm publish
```

## Automazione CI/CD

Su GitHub Actions, la pubblicazione è automatica quando si crea una release:

```yaml
# .github/workflows/publish.yml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: pnpm install
      - run: pnpm build
      - run: pnpm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Post-Pubblicazione

1. Crea una **GitHub Release** con le note di rilascio
2. Aggiorna la documentazione (se necessario)
3. Annuncia nelle **Discussion** del progetto

## Troubleshooting

### Errore: `403 Forbidden`

Probabilmente il nome del pacchetto è già occupato. Verifica su npm.

### Errore: `You must be logged in`

```bash
npm login
pnpm login
```

### Errore: `Unscoped packages cannot be private`

Usa uno scope (`@studio-immens/...`) per pacchetti privati.

## Link utili

- [npm publish docs](https://docs.npmjs.com/cli/commands/npm-publish)
- [Changesets](https://github.com/changesets/changesets)
- [GitHub Packages](https://github.com/features/packages)
