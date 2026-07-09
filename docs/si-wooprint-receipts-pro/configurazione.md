# WooPrint Receipts Pro - Configurazione

## Configurazione

### Stampante di Rete (ESC/POS)

1. Vai su **WooPrint Receipts > Stampanti**
2. Aggiungi stampante con tipo "Rete ESC/POS"
3. Inserisci IP e porta (default: 9100)
4. Seleziona set caratteri (CP437, CP850, CP858, UTF-8)

### USB Print Node

1. Installa l'app Node.js dalla directory `print-node/` del plugin:
   ```
   cd print-node
   npm install
   node server.js
   ```
2. Configura l'URL del Print Node in **WooPrint Receipts > Impostazioni**

### Regole Avanzate

Oltre ai trigger base (nuovo ordine / cambio stato), puoi filtrare per:
- **Categoria prodotto**: stampa solo ordini con prodotti di una categoria
- **Tag prodotto**: stampa solo ordini con certi tag
- **Prodotto specifico**: stampa solo se un prodotto specifico è nell'ordine

### Cassetto Contanti

Attiva "Apri cassetto" nella configurazione stampante per ordini in contanti.

### Barcode

Il barcode CODE39 con ID ordine viene stampato automaticamente in fondo alla ricevuta.

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [API](api.md)
