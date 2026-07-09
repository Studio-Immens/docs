# Immens MCP Fortress - Sicurezza

## Access Points

Crea access points con permessi granulari:

- **Read-only**: solo lettura (post, media, commenti)
- **Full**: lettura + scrittura
- **Custom**: seleziona singoli tool permessi

## IP Whitelist

Limita l'accesso a specifici IP:

```
192.168.1.0/24
10.0.0.1
203.0.113.0/24
```

## Auditing

Tutte le operazioni sono registrate nel log audit con timestamp, IP, tool usato e parametri.

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md) | [API](api.md)
