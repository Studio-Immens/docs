# SIWP Reseller - Configurazione

## Dashboard

Il pannello principale mostra:
- Clienti attivi
- Licenze assegnate
- Fatturato mensile
- Rinnovi in scadenza

## Gestione Clienti

1. Aggiungi un nuovo cliente
2. Assegna licenze plugin
3. Il cliente riceve email con credenziali

## API

```http
GET /wp-json/siwp-reseller/v1/licenses
POST /wp-json/siwp-reseller/v1/licenses/assign
POST /wp-json/siwp-reseller/v1/licenses/revoke
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [API](api.md)
