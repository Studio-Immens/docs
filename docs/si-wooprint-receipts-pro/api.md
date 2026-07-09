# WooPrint Receipts Pro - API & Utilizzo Avanzato

## Stampa ESC/POS

Il Pro invia comandi ESC/POS direttamente alla stampante via TCP/IP:

- **Porta predefinita**: 9100
- **Set caratteri**: CP437, CP850, CP858, UTF-8
- **Comandi supportati**:
  - Taglio carta (GS V m)
  - Apertura cassetto (ESC p)
  - Barcode CODE39
  - NV Graphics (immagine header)
  - Allineamento, grassetto, dimensione carattere

## USB Print Node

Applicazione Node.js per stampanti USB/seriali:

```bash
cd print-node
npm install
node server.js
```

Il Print Node riceve dati ESC/POS in base64 via HTTP e li invia alla stampante USB.

## Regole di Stampa Avanzate

Parametri filtro aggiuntivi:

| Filtro | Descrizione |
|--------|-------------|
| `categories` | Array di ID categorie prodotto |
| `tags` | Array di ID tag prodotto |
| `products` | Array di ID prodotto specifici |
| `match_mode` | `any` (almeno uno) o `all` (tutti) |


---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md)
