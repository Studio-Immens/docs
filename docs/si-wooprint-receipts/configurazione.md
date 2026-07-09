# WooPrint Receipts - Configurazione

## Configurazione

### Impostazioni

1. Vai su **WooCommerce > WooPrint Receipts**
2. Configura:
   - **Logo**: carica il tuo logo aziendale
   - **Intestazione**: testo da mostrare in cima alla ricevuta
   - **Piè di pagina**: messaggio promozionale o note legali
   - **Colonne**: seleziona ID, Qty, Nome, Totale
   - **Larghezza carta**: 80mm o 58mm
   - **Troncamento**: max caratteri per nome prodotto

### Stampanti

1. Vai su **WooPrint Receipts > Stampanti**
2. Aggiungi stampante:
   - Nome identificativo
   - Tipo connessione
   - Larghezza carta
   - Auto-print (stampa automatica alla ricezione ordine)
   - Copie per job
   - Utenti assegnati

### Regole di stampa

1. Vai su **WooPrint Receipts > Regole**
2. Crea regole con:
   - **Trigger**: nuovo ordine / cambio stato
   - **Filtri**: per utente/ruolo
   - **Azione**: stampa su stampante specifica

### Shortcode

```
[wooprint_receipt order_id="123"]
[wooprint_receipt order_id="123" label="Stampa ricevuta"]
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md)
