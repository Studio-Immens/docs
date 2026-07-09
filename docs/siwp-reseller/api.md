# SIWP Reseller - API & Utilizzo Avanzato

## REST API

| Endpoint | Descrizione |
|----------|-------------|
| `POST /wp-json/siwp-reseller/v1/sdi/callback` | Callback stato SDI FatturaPA |

## AJAX Endpoints

Il plugin espone 80+ endpoint AJAX per tutte le operazioni:

### Dashboard
- `siwp_get_dashboard_stats` - Statistiche dashboard
- `siwp_get_revenue_data` - Dati fatturato
- `siwp_get_top_products` - Prodotti più venduti
- `siwp_get_low_stock_products` - Prodotti in esaurimento

### Contatti
- `siwp_get_contacts` - Lista contatti
- `siwp_save_contact` - Salva contatto
- `siwp_delete_contact` - Elimina contatto

### Fatture
- `siwp_get_invoices` - Lista fatture
- `siwp_save_invoice` - Salva fattura
- `siwp_download_invoice_xml` - Scarica XML FatturaPA
- `siwp_send_invoice_sdi` - Invia fattura via SDI

### Preventivi
- `siwp_get_estimates` - Lista preventivi
- `siwp_convert_estimate_to_order` - Converti in ordine WC
- `siwp_convert_estimate_to_invoice` - Converti in fattura
- `siwp_send_estimate_email` - Invia preventivo via email

### DDT
- `siwp_get_ddt` - Lista DDT
- `siwp_save_ddt` - Salva DDT
- `siwp_download_ddt_pdf` - Scarica PDF DDT

### Magazzino
- `siwp_get_warehouse_products` - Prodotti magazzino
- `siwp_get_warehouse_stats` - Statistiche magazzino
- `siwp_create_product` - Crea prodotto
- `siwp_quick_update_stock` - Aggiorna stock rapido

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md)
