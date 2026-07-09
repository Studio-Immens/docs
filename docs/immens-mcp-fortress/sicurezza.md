# Immens MCP Fortress - Sicurezza

## Access Points

Crea access points con permessi granulari:

- **Read-only**: solo lettura (post, media, commenti)
- **Full**: lettura + scrittura
- **Custom**: seleziona singoli tool permessi

## IP Whitelist

Limita l'accesso a specifici IP o subnet in notazione CIDR:

```
192.168.1.0/24
10.0.0.1
203.0.113.0/24
```

## Rate Limiting

Ogni access point ha un limite configurabile di richieste al minuto (default: 60).

## Autenticazione

- **Bearer Token**: API key formato `imf_` + 64 hex char nell'header Authorization
- **URL Parameter**: API key come parametro URL `?api_key=...`
- **OAuth 2.1 PKCE**: per applicazioni third-party

## Audit Log

Tutte le operazioni MCP sono registrate con:
- Tool utilizzato
- Argomenti della chiamata
- IP di origine
- Stato (successo/errore)
- Timestamp

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md) | [API](api.md)
