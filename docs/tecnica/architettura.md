# Architettura dei Progetti Studio Immens

> Panoramica delle scelte architetturali che accomunano i progetti dell'organizzazione.

## Principi Fondamentali

1. **Composizione > Ereditarietà** — I componenti sono composabili, non gerarchici.
2. **Zero configurazioni nascoste** — Ogni comportamento è esplicito e documentato.
3. **Accessibilità first** — I componenti nascono accessibili, non vengono resi tali in seguito.
4. **Tree-shakeable** — Si importa solo ciò che si usa, niente bundle gonfiati.
5. **Type safety** — TypeScript strict mode ovunque.

## Pattern Architetturale Comune

```
┌─────────────────────────────────────────────┐
│              Consumatore (App)               │
├─────────────────────────────────────────────┤
│          Componenti / UI Layer              │
├─────────────────────────────────────────────┤
│            Hook / Business Logic            │
├─────────────────────────────────────────────┤
│               API / Services                │
├─────────────────────────────────────────────┤
│                 Core / Types                │
└─────────────────────────────────────────────┘
```

### Layer 1: Core / Types

Definizioni di base, interfacce TypeScript, tipi condivisi. Nessuna dipendenza esterna.

### Layer 2: API / Services

Logica di comunicazione con servizi esterni: REST, GraphQL, WebSocket, file system.

### Layer 3: Hook / Business Logic

React hooks custom (nei progetti React) o funzioni pure che orchestrano la logica applicativa.

### Layer 4: Componenti / UI Layer

Componenti presentazionali, puramente dichiarativi, che ricevono props e renderizzano.

## Standard Condivisi

### Package Manager

Tutti i progetti usano **pnpm** per:
- Workspace monorepo nativi
- Risoluzione dipendenze più veloce
- Disco rigido più efficiente

### TypeScript

Configurazione rigorosa:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

### Testing

- **Unit test:** Vitest
- **Component test:** Testing Library (React)
- **E2E / Accessibilità:** Playwright + axe-core
- **Coverage target:** ≥ 85%

### Git

- **Branch naming:** `feature/`, `fix/`, `chore/`, `docs/`
- **Commit convention:** [Conventional Commits](https://www.conventionalcommits.org/)
- **PR template:** Standardizzato con checklist qualità

## Pubblicazione

1. `pnpm changeset` — genera changelog automatico
2. `pnpm build` — build pulita
3. `pnpm publish` — pubblica su npm e/o GitHub Packages
4. GitHub Actions aggiorna automaticamente il changelog su release

## Link utili

- [pnpm](https://pnpm.io)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Changesets](https://github.com/changesets/changesets)
