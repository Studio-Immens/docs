# 🛡️ Immens MCP Fortress

**Tipo**: FREE
**Plugin**: immens-mcp-fortress

Connetti qualsiasi AI (Claude, ChatGPT, Cursor, OpenClaw) al tuo WordPress tramite protocollo MCP (Model Context Protocol). Espone oltre 100 strumenti per gestire post, pagine, media, WooCommerce, SEO, traduzioni e molto altro.

## Caratteristiche

- Oltre 100 strumenti MCP per WordPress
- Multi-sito: gestisci piu' WordPress da un unico server MCP
- Sistema di access points con permessi granulari
- IP whitelist per sicurezza
- Audit logging di tutte le operazioni
- Supporto SSE e streamable-http
- Gratuito e open-source


## Come si usa

1. **Installa il plugin** su WordPress
2. **Configura un Access Point** con i permessi desiderati
3. **Ottieni l'API key** (formato: `imf_...`)
4. **Configura il tuo AI client** per connettersi all'endpoint MCP

## Endpoint MCP

```
https://iltuosito.com/wp-json/immens-mcp-fortress/v1/mcp/imf_{API_KEY}
```

## Strumenti disponibili

Il plugin espone strumenti per:

- **Posts**: creare, leggere, aggiornare, eliminare articoli e pagine
- **Media**: caricare e gestire file multimediali
- **Tassonomie**: gestire categorie, tag e termini personalizzati
- **Commenti**: moderare e gestire commenti
- **Menu**: creare e gestire menu di navigazione
- **Utenti**: gestire utenti WordPress
- **Template**: gestire template a blocchi (FSE)
- **WooCommerce**: gestire prodotti, ordini, clienti
- **SEO**: leggere e aggiornare meta SEO (The SEO Framework, Rank Math, Yoast)
- **Traduzioni**: gestire traduzioni (TranslatePress, Polylang)
- **Cache**: pulire cache (W3 Total Cache, Greenshift)
- **Global Styles**: leggere e aggiornare stili globali
- **REST API**: eseguire chiamate REST API generiche

---

<small>Studio Immens - Documentazione tecnica</small>
