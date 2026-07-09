# Primary Source

**Tipo**: FREE
**Plugin**: primary-source

Plugin WordPress che definisce la "sorgente primaria" (primary source) per gli agenti Paperclip/OpenClaw. Determina se le istruzioni dell'agente vengono dalla directory gestita da Paperclip o da un workspace esterno.

## Caratteristiche

- Due modalita': managed (Paperclip gestisce) o external (workspace locale)
- Configurazione `instructionsRootPath` per workspace esterno
- File di entry point personalizzabile (default: AGENTS.md)
- Supporto per file SOUL.md, TOOLS.md, HEARTBEAT.md, MEMORY.md


## Modalita' Managed
Di default, Paperclip gestisce centralmente i file di istruzioni.

## Modalita' External
```json
{
  "instructionsBundleMode": "external",
  "instructionsRootPath": "/path/to/agent/workspace",
  "instructionsEntryFile": "AGENTS.md"
}
```

In questa modalita', Paperclip usa il workspace dell'agente per leggere AGENTS.md, SOUL.md, TOOLS.md, ecc.

---

<small>Studio Immens - Documentazione tecnica</small>
