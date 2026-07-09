# MCP Fortress Pro - Configurazione

## Configurazione

### Feature Flag

Vai su **MCP Fortress > Licenza Pro** per vedere lo stato delle feature:

| Feature | Stato |
|---------|-------|
| Unlimited Access Points | Attivo/Disattivo |
| Gutenberg Block-Level | Attivo/Disattivo |
| SSE Transport | Attivo/Disattivo |
| Change History | Attivo/Disattivo |
| Integration Tools | Attivo/Disattivo |

### Change History

1. Vai su **MCP Fortress > Change History**
2. Ogni operazione AI mostra: tool usato, parametri, stato, IP, timestamp
3. Le operazioni di scrittura hanno snapshot "prima/dopo"
4. Puoi ripristinare versioni precedenti

### Block-Level Editing

Il Pro permette agli AI agent di manipolare i blocchi Gutenberg singolarmente:
- **Parse**: leggere la struttura blocchi di un post
- **Add**: aggiungere nuovi blocchi in posizioni specifiche
- **Remove**: rimuovere blocchi per ID o tipo
- **Reorder**: riordinare i blocchi
- **Update**: modificare attributi di blocchi esistenti

### HTML-to-Blocks

Quando un AI crea un post via REST API con `imf_convert_to_blocks=true`, l'HTML viene automaticamente convertito in blocchi Gutenberg rilevando il builder (Greenshift, Stackable, o Core).

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md)
