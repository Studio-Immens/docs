# Immens MCP Fortress - API & Utilizzo

## Endpoint MCP

```
POST https://iltuosito.com/wp-json/immens-mcp-fortress/v1/mcp/imf_{API_KEY}
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

## Esempi

### Listare tutti i post

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "wp_list_posts",
    "arguments": {"per_page": 10}
  }
}
```

### Creare un articolo

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "wp_create_post",
    "arguments": {"title": "Mio articolo", "content": "Contenuto..."}
  }
}
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md)
