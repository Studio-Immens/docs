# Immens MCP Fortress - Configurazione

## Configurazione

### Access Points

1. Vai su **MCP Fortress > Access Points**
2. Ogni access point ha:
   - **API Key**: formato `imf_` + 64 hex char
   - **Permessi**: seleziona quali tool permettere per categoria
   - **IP Whitelist**: limita a specifici IP (CIDR)
   - **Rate Limit**: richieste al minuto (default 60)
   - **Utente WordPress**: associa un utente WP per le operazioni

### Endpoint MCP

L'endpoint per connettere il tuo AI client:

```
POST https://iltuosito.com/wp-json/immens-mcp-fortress/v1/mcp/imf_{API_KEY}
Content-Type: application/json
```

Esempio di inizializzazione:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-11-05",
    "capabilities": {},
    "clientInfo": {"name": "my-ai", "version": "1.0"}
  }
}
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [API](api.md) | [Sicurezza](sicurezza.md)
