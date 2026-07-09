# Soul — Motore di Personalità per Assistenti AI

> **Repo:** `studio-immens/soul`  
> **Categoria:** Prodotto / AI Agent Framework  
> **Linguaggio:** TypeScript, JSON Schema  

## Panoramica

**Soul** è un motore per definire, caricare e applicare personalità (soul) ad assistenti AI. Permette di separare la personalità di un agente dal suo codice, rendendo ogni agente facilmente riconfigurabile senza toccare implementazione.

Ispirato ai file SOUL.md di OpenClaw, Soul generalizza il concetto in un formato standardizzato e portabile.

## Tech Stack

| Componente | Tecnologia |
|---|---|
| Core | TypeScript 5.x |
| Validazione | Zod / JSON Schema |
| Runtime | Node.js 20+ / Bun |
| Formati | Markdown + YAML + JSON |
| Integrazione | OpenAI SDK, Anthropic SDK |

## Setup

```bash
npm install @studio-immens/soul
```

### Utilizzo base

```typescript
import { Soul } from '@studio-immens/soul';
import { readFileSync } from 'fs';

// Carica un'anima da file
const soul = Soul.fromFile('./personalities/assistente-amichevole.md');

// Applica a un sistema prompt
const prompt = soul.buildSystemPrompt({
  agentName: 'Milo',
  context: 'Assistente di supporto tecnico',
});

console.log(prompt);
// Output: "Sei Milo, un assistente di supporto tecnico..."
```

## Formato Soul

Un file Soul (.soul.md) è un documento Markdown con frontmatter YAML strutturato:

```yaml
---
name: "Assistente Amichevole"
version: 1.0.0
author: "Studio Immens"
tags: [support, friendly, italian]
model: "gpt-4o-mini"
temperature: 0.7
---
# Assistente Amichevole

## Core Truths

- **Sii genuinamente utile, non performativamente utile.**
- **Ammetti quando non sai qualcosa.**
- **Usa un tono caldo ma professionale.**

## Vibe

Sei l'assistente che vorresti avere: paziente, chiaro, reale.
Niente "come posso aiutarti oggi?" finto — vai dritto al punto.

## Boundaries

- Non dare consigli medici o legali.
- Non inventare fatti.
- Se non sai, dì "non lo so".
```

### API

```typescript
// Creare un'anima da zero
const soul = new Soul({
  name: "Critico Costruttivo",
  version: "1.0.0",
  coreTruths: [
    "Sii onesto ma costruttivo",
    "Critica le idee, non le persone",
  ],
  vibe: "Sharp, diretto, rispettoso",
  boundaries: [
    "Niente attacchi personali",
    "Niente sarcasmo gratuito",
  ],
});

// Validare un file soul
Soul.validate('./personalities/critico.soul.md');

// Convertire formati
soul.toYAML();   // → stringa YAML
soul.toJSON();   // → oggetto JSON
soul.toMarkdown(); // → stringa Markdown

// Applicare a un system prompt per diversi provider
soul.forOpenAI();      // → stringa pronta per messages[0].content
soul.forAnthropic();   // → stringa pronta per system prompt
```

## Esempi

### Integrazione con OpenAI

```typescript
import OpenAI from 'openai';
import { Soul } from '@studio-immens/soul';

const soul = Soul.fromFile('./souls/tecnico-supporto.soul.md');
const openai = new OpenAI();

async function chat(messages: Array<{ role: string; content: string }>) {
  const response = await openai.chat.completions.create({
    model: soul.config.model || 'gpt-4o-mini',
    temperature: soul.config.temperature || 0.7,
    messages: [
      { role: 'system', content: soul.forOpenAI() },
      ...messages,
    ],
  });
  return response.choices[0].message.content;
}
```

### Validare e testare

```typescript
import { Soul } from '@studio-immens/soul';
import { describe, it, expect } from 'vitest';

describe('Soul: tecnico-supporto', () => {
  const soul = Soul.fromFile('./souls/tecnico-supporto.soul.md');

  it('dovrebbe avere i campi obbligatori', () => {
    expect(soul.name).toBeDefined();
    expect(soul.coreTruths.length).toBeGreaterThan(0);
    expect(soul.boundaries.length).toBeGreaterThan(0);
  });

  it('non dovrebbe contenere regole contraddittorie', () => {
    const issues = soul.findContradictions();
    expect(issues).toHaveLength(0);
  });
});
```

## CLI

```bash
# Validare un file soul
npx soul validate ./personalties/*.soul.md

# Generare system prompt da un file soul
npx soul build ./personalties/amichevole.soul.md --format openai

# Inizializzare un nuovo file soul
npx soul init "Agente X"
```

## Link utili

- [Repo GitHub](https://github.com/studio-immens/soul)
- [npm](https://www.npmjs.com/package/@studio-immens/soul)
- [OpenClaw SOUL.md concept](https://openclaw.ai/concepts/soul)
