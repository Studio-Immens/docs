# Contribuire a un Progetto

> Guida per contribuire ai progetti open-source di Studio Immens.

## Prerequisiti

- [Setup ambiente di sviluppo](./setup-dev.md) completato
- Un account GitHub
- Aver letto il README del progetto target

## Passi

### 1. Scegli un issue

Guarda le [issue aperte](https://github.com/studio-immens/) del progetto. Cerca tag come:

- `good first issue` — Per prime contribuzioni
- `help wanted` — Cerchiamo aiuto
- `bug` — Bug da fixare
- `enhancement` — Nuove funzionalità

Commenta sull'issue per dire che ci lavori, così evitiamo duplicati.

### 2. Fork e branch

```bash
# Fork via GitHub UI, poi:
git clone https://github.com/tuo-utente/<repo>.git
cd <repo>
git remote add upstream https://github.com/studio-immens/<repo>.git
git checkout -b feature/nome-della-feature
```

### 3. Sviluppo

- Scrivi codice seguendo i pattern del progetto
- Aggiungi **test** per ogni nuova funzionalità
- Mantieni la **copertura** ≥ 85%
- Usa **Conventional Commits**:

```bash
git commit -m "feat(button): add loading state variant"
git commit -m "fix(modal): close on Escape key"
git commit -m "docs(readme): update installation instructions"
```

### 4. Test pre-PR

```bash
pnpm typecheck    # Nessun errore TypeScript
pnpm lint         # Nessun warning
pnpm test         # Tutti i test verdi
pnpm build        # Build senza errori
```

### 5. Crea la Pull Request

- Vai su GitHub e crea PR verso `main`
- Usa il template PR (si compila automaticamente)
- Descrivi **cosa** hai fatto e **perché**
- Se chiude un issue, scrivi `Closes #123`

### 6. Review

- Un maintainer revisionerà il tuo codice
- Potrebbero chiedere modifiche — è normale!
- Rispondi ai commenti e aggiorna il branch

## Code of Conduct

I progetti Studio Immens seguono il [Contributor Covenant](https://www.contributor-covenant.org/). Sii rispettoso, costruttivo e inclusivo.

## Linee Guida

### Cosa NON fare

- ❌ PR massive con mille cambiamenti
- ❌ Modificare style guide o tooling senza discuterne prima
- ❌ Aggiungere dipendenze senza necessità reale
- ❌ Ignorare i test esistenti

### Cosa fare

- ✅ PR piccole e focalizzate
- ✅ Chiedere prima di fare refactoring enormi
- ✅ Testare sia il caso felice che i casi limite
- ✅ Documentare API pubbliche con JSDoc

## Riconoscimenti

I contributori vengono aggiunti automaticamente al file `CONTRIBUTORS.md` del progetto e menzionati nelle release notes.

## Link utili

- [Come scrivere una buona PR](https://www.pullrequest.com/blog/writing-a-good-pull-request/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
