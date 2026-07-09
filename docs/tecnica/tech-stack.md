# Stack Tecnologico Comune

> Tecnologie e strumenti usati trasversalmente nei progetti Studio Immens.

## Linguaggi

| Linguaggio | Utilizzo | Versione target |
|---|---|---|
| TypeScript | Linguaggio principale per tutti i progetti | ≥ 5.4 |
| Lua | Configurazione Neovim (.files) | Lua 5.1+ |
| Shell (Zsh/Bash) | Scripting, dotfiles, CI | Bash 5+ / Zsh 5.9+ |
| CSS / PostCSS | Stili componenti e design system | PostCSS 8+ |
| YAML | Configurazioni, CI/CD, frontmatter | — |

## Frontend

| Strumento | Utilizzo |
|---|---|
| React 18+ / 19 | Framework UI primario |
| Vite | Bundler per sviluppo e build |
| CSS Modules | Incapsulamento stili |
| CSS Custom Properties | Theming dinamico |
| Storybook 8 | Documentazione componenti interattiva |

## Backend / Tooling

| Strumento | Utilizzo |
|---|---|
| Node.js 20+ (LTS) | Runtime |
| pnpm | Package manager |
| tsup / Rollup | Build librerie |
| Vitest | Testing unit/integrazione |
| Playwright | Testing E2E e accessibilità |
| Biome / ESLint | Linting e formattazione |
| GitHub Actions | CI/CD |

## AI / ML

| Strumento | Utilizzo |
|---|---|
| OpenAI SDK | Integrazione modelli GPT |
| Anthropic SDK | Integrazione Claude |
| Zod | Validazione runtime TypeScript |
| Vercel AI SDK | Streaming e tool calling |

## Servizi Cloud (dove applicabile)

| Servizio | Utilizzo |
|---|---|
| GitHub | Version control + Packages |
| npm | Pubblicazione pacchetti |
| Vercel / Netlify | Deploy documentazione static |

## Versioni Consigliate

Per sviluppare sui progetti Studio Immens, assicurati di avere:

```bash
node --version   # ≥ 20.0.0
pnpm --version   # ≥ 9.0.0
git --version    # ≥ 2.40
```

## nvm / Volta

Si consiglia l'uso di **Volta** come toolchain manager:

```bash
volta install node@20
volta install pnpm@latest
```
