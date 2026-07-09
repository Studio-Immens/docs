# Immens CRM Core - Configurazione

## Configurazione Iniziale

1. Vai su **CRM > Impostazioni**
2. Configura:
   - **Pipeline**: crea pipeline e stage personalizzati
   - **Campi personalizzati**: definisci i campi per i contatti
   - **AI Provider**: inserisci API key per Gemini, OpenAI, ecc.
   - **Email**: configura mittente e SMTP
   - **Notifiche**: Slack/Telegram webhook

### Gestione Contatti

1. Vai su **CRM > Contatti**
2. Aggiungi contatti manualmente o via import CSV
3. Assegna tag, pipeline, e proprietario
4. Visualizza attività, note, e transazioni

### Automazioni

1. Vai su **CRM > Automazioni**
2. Crea un nuovo workflow:
   - **Trigger**: nuovo contatto, cambio stage, deal vinto...
   - **Condizioni**: AND/OR logiche
   - **Azioni**: assegna tag, invia email, cambia stage...

### API REST

Il CRM espone API REST complete sotto il namespace `immens-crm/v1`:

| Endpoint | Descrizione |
|----------|-------------|
| `GET /contacts` | Lista contatti |
| `POST /contacts` | Crea contatto |
| `GET /contacts/{id}` | Dettaglio contatto |
| `GET /deals` | Lista deal |
| `POST /automations` | Crea automazione |
| `GET /reports` | Report statistici |

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [API](api.md)
