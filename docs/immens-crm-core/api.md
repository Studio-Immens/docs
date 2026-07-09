# Immens CRM Core - API & Utilizzo Avanzato

## REST API

Namespace: `immens-crm/v1`

| Endpoint | Descrizione |
|----------|-------------|
| `GET /contacts` | Lista contatti (paginata, filtrabile) |
| `POST /contacts` | Crea nuovo contatto |
| `GET /contacts/{id}` | Dettaglio contatto |
| `PUT /contacts/{id}` | Aggiorna contatto |
| `DELETE /contacts/{id}` | Elimina contatto |
| `GET /contacts/{id}/activities` | Attività del contatto |
| `GET /contacts/{id}/transactions` | Transazioni del contatto |
| `POST /contacts/batch` | Operazioni batch |
| `GET /deals` | Lista deal |
| `POST /deals` | Crea deal |
| `GET /pipelines` | Lista pipeline |
| `GET /tags` | Lista tag |
| `POST /automations` | Crea automazione |
| `GET /reports` | Report statistici |
| `GET /stats` | Statistiche aggregate |
| `GET /dashboard` | Dati dashboard |
| `POST /webhooks` | Crea webhook |

### MCP Tools

Tutte le funzionalità CRM sono accessibili anche come tool MCP:

```
studioimmens__crm_list_contacts()
studioimmens__crm_get_contact(id=42)
studioimmens__crm_create_contact(name="Mario", email="mario@esempio.it")
studioimmens__crm_get_stats(range="30days")
studioimmens__crm_get_ai_insight(range="30days")
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md)
