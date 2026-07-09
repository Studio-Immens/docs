# Azzero — Framework per Design System Accessibili

> **Repo:** `studio-immens/azzero`  
> **Categoria:** Prodotto / UI Framework  
> **Linguaggio:** TypeScript, CSS (PostCSS)  

## Panoramica

**Azzero** è un design system framework minimalista, accessibile e performante sviluppato da Studio Immens. Il nome richiama il concetto di "azzeramento" visivo: partire da zero con componenti semanticamente corretti e accessibili, senza sovrascrivere gli stili di default del browser.

Ideale per progetti che necessitano di un sistema di design robusto senza il peso di un framework UI completo.

## Tech Stack

| Componente | Tecnologia |
|---|---|
| Core | TypeScript 5.x |
| Stili | PostCSS + CSS Custom Properties |
| Build | Vite / tsup |
| Testing | Vitest + Playwright (accessibilità) |
| Documentazione | Storybook 8 |
| Package Manager | pnpm |
| Pubblicazione | npm + GitHub Packages |

## Setup

### Installazione

```bash
npm install @studio-immens/azzero
# o
pnpm add @studio-immens/azzero
```

### Utilizzo base

```tsx
import { Button, Card, Stack } from '@studio-immens/azzero';
import '@studio-immens/azzero/dist/style.css';

function App() {
  return (
    <Stack gap="md">
      <Card variant="elevated" padding="lg">
        <h2>Benvenuto in Azzero</h2>
        <Button variant="primary" onClick={() => alert('Ciao!')}>
          Clicca qui
        </Button>
      </Card>
    </Stack>
  );
}
```

## Componenti principali

- **Button** — Varianti: `primary`, `secondary`, `ghost`, `danger`. Supporto icone e loading state.
- **Card** — Varianti: `flat`, `elevated`, `bordered`. Padding configurabile.
- **Stack** — Layout flessibile con gap predefinito e direzione controllabile.
- **Input** — Campo form con label accessibile, messaggi di errore e validazione.
- **Modal** — Dialog modale con focus trap, chiusura con Escape e gestione ARIA.
- **Select** — Selectbox accessibile con ricerca e opzioni raggruppate.

## Accessibilità

Azzero segue rigorosamente le **WCAG 2.2 AA**:

- Contrasto colore ≥ 4.5:1 per testo normale
- Focus visibile su tutti gli elementi interattivi
- Attributi ARIA generati automaticamente
- Supporto per screen reader (label associate, ruoli corretti)
- Navigazione da tastiera completa

## Theming

Personalizzazione tramite CSS Custom Properties:

```css
:root {
  --azzero-color-primary: #6366f1;
  --azzero-color-primary-hover: #4f46e5;
  --azzero-radius-sm: 4px;
  --azzero-radius-md: 8px;
  --azzero-font-family: 'Inter', system-ui, sans-serif;
}
```

## Esempi

### Form con validazione

```tsx
import { Input, Button, Stack } from '@studio-immens/azzero';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Stack gap="md">
        <Input
          label="Email"
          error={errors.email?.message}
          {...register('email', { required: 'Email obbligatoria' })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: 'Password obbligatoria' })}
        />
        <Button type="submit" variant="primary">Accedi</Button>
      </Stack>
    </form>
  );
}
```

## Link utili

- [Repo GitHub](https://github.com/studio-immens/azzero)
- [Storybook](https://azzero.studio-immens.dev) (se pubblico)
- [Documentazione WCAG 2.2](https://www.w3.org/TR/WCAG22/)
