# Immens CRM Core - Configurazione

## Gestione Contatti

- Campi personalizzabili
- Tag e segmentazione
- Storico attivita'
- Note e allegati

## Pipeline

Crea pipeline con stage personalizzabili:
- Lead → Contattato → Qualificato → Proposta → Chiuso

## Automazioni

- Email automatiche per stage cambio
- Promemoria follow-up
- Notifiche slack/telegram

## Analytics AI

Il CRM include analisi AI per:
- Previsione chiusura deal
- Lead scoring automatico
- Suggerimenti prossima azione
- Report performance vendite

## API MCP

Tutte le funzionalita' CRM sono accessibili via MCP:

```python
studioimmens__crm_list_contacts()
studioimmens__crm_get_contact(id=42)
studioimmens__crm_get_stats(range="30days")
studioimmens__crm_get_ai_insight(range="30days")
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [API](api.md)
