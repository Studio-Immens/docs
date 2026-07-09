# Primary Source - Configurazione

## Configurazione

### Modalità Managed

Di default, Paperclip gestisce centralmente i file di istruzioni dell'agente. Non serve configurazione aggiuntiva.

### Modalità External

Quando vuoi che l'agente usi i file dal tuo workspace:

```json
{
  "instructionsBundleMode": "external",
  "instructionsRootPath": "/path/to/agent/workspace",
  "instructionsEntryFile": "AGENTS.md"
}
```

Paperclip legge dal workspace:
- `AGENTS.md` - Istruzioni principali dell'agente
- `SOUL.md` - Personalità e tono
- `TOOLS.md` - Strumenti disponibili
- `HEARTBEAT.md` - Attività periodiche
- `MEMORY.md` - Memoria persistente
- `USER.md` - Istruzioni utente

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md)
