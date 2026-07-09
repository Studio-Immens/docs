# Primary Source - Configurazione

## Modalita' Managed

Di default, Paperclip gestisce centralmente i file di istruzioni dell'agente.

## Modalita' External

```json
{
  "instructionsBundleMode": "external",
  "instructionsRootPath": "/path/to/agent/workspace",
  "instructionsEntryFile": "AGENTS.md"
}
```

In questa modalita', Paperclip legge AGENTS.md, SOUL.md, TOOLS.md, ecc. dal workspace dell'agente.

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [API](api.md)
