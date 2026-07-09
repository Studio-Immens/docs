# Capsule — Componenti UI Leggeri e Riutilizzabili

> **Repo:** `studio-immens/capsule`  
> **Categoria:** Prodotto / Component Library  
> **Linguaggio:** TypeScript, React, CSS Modules  

## Panoramica

**Capsule** è una libreria di componenti UI minimali e indipendenti per React, pensata per progetti che vogliono solo componenti specifici senza adottare un design system completo. Ogni componente è "incapsulato" — importa solo ciò di cui ha bisogno, senza stili globali o dipendenze nascoste.

A differenza di Azzero (design system), Capsule è pensato per essere *prelevato a pezzi*: prendi solo gli ingredienti che ti servono.

## Tech Stack

| Componente | Tecnologia |
|---|---|
| Framework | React 18+ / 19 |
| Linguaggio | TypeScript 5.x |
| Stili | CSS Modules + PostCSS |
| Build | Rollup + tsup |
| Testing | Vitest + Testing Library |
| Pubblicazione | npm (pacchetti individuali) |

## Setup

### Installazione completa

```bash
npm install @studio-immens/capsule
```

### Installazione per componente

Ogni componente è disponibile come pacchetto separato:

```bash
npm install @studio-immens/capsule-button
npm install @studio-immens/capsule-dialog
npm install @studio-immens/capsule-toast
```

### Utilizzo base

```tsx
import { Toast } from '@studio-immens/capsule';
import '@studio-immens/capsule/dist/toast.css';

function App() {
  return <Toast message="Operazione completata!" variant="success" />;
}
```

## Componenti disponibili

| Componente | Pacchetto | Descrizione |
|---|---|---|
| Button | `capsule-button` | Pulsante con varianti e loading |
| Dialog | `capsule-dialog` | Dialog modale con focus trap |
| Toast | `capsule-toast` | Notifica temporanea |
| Tooltip | `capsule-tooltip` | Tooltip su hover/focus |
| Badge | `capsule-badge` | Badge numerico o testuale |
| Spinner | `capsule-spinner` | Indicatore di caricamento |
| Avatar | `capsule-avatar` | Avatar con iniziali o immagine |
| Chip | `capsule-chip` | Tag/chip rimovibile |
| Tabs | `capsule-tabs` | Navigazione a tab |
| Accordion | `capsule-accordion` | Pannello espandibile |

## Esempi

### Dialog con conferma

```tsx
import { Dialog, Button } from '@studio-immens/capsule';
import { useState } from 'react';

function ConfirmDelete() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Elimina
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Conferma eliminazione"
        actions={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={() => { /* elimina */ setOpen(false); }}>
              Conferma
            </Button>
          </>
        }
      >
        <p>Sei sicuro di voler eliminare questo elemento? Questa azione è irreversibile.</p>
      </Dialog>
    </>
  );
}
```

### Toast con auto-dismiss

```tsx
import { Toast } from '@studio-immens/capsule';

function Notifications() {
  return (
    <div style={{ position: 'fixed', top: 16, right: 16 }}>
      <Toast
        message="Documento salvato con successo"
        variant="success"
        duration={3000}
        dismissible
      />
    </div>
  );
}
```

## Pattern: Composable

Capsule segue un pattern composabile. I componenti accettano `className` per sovrascrivere stili e supportano `as` prop per il rendering polimorfico:

```tsx
<Button as="a" href="/dashboard" variant="primary">
  Vai alla Dashboard
</Button>
```

## Link utili

- [Repo GitHub](https://github.com/studio-immens/capsule)
- [Pacchetti npm](https://www.npmjs.com/org/studio-immens)
