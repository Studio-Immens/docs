# Immens MCP Fortress - API & Utilizzo Avanzato

## Endpoint MCP

```
POST https://iltuosito.com/wp-json/immens-mcp-fortress/v1/mcp/imf_{API_KEY}
Content-Type: application/json
```

## Strumenti disponibili

Il plugin espone 121 strumenti MCP organizzati per categoria:

| Categoria | Strumenti | Esempi |
|-----------|-----------|--------|
| Posts | 8 | wp_list_posts, wp_create_post, wp_update_post |
| Pages | 8 | wp_list_pages, wp_create_page, wp_update_page |
| Media | 7 | wp_list_media, wp_upload_media, wp_delete_media |
| Comments | 8 | wp_list_comments, wp_approve_comment, wp_spam_comment |
| Users | 5 | wp_list_users, wp_create_user, wp_delete_user |
| Categories | 5 | wp_list_categories, wp_create_category |
| Tags | 5 | wp_list_tags, wp_create_tag |
| Terms | 8 | wp_list_terms, wp_create_term, wp_update_term_meta |
| Menus | 9 | wp_list_menus, wp_create_menu_item |
| WooCommerce | 10 | wc_list_products, wc_get_order, wc_get_store_stats |
| SEO (Yoast) | 6 | tsf_get_post_seo, tsf_analyze_post_seo |
| SEO (RankMath) | 6 | tsf_get_post_seo, tsf_get_analytics |
| Templates | 3 | wp_list_templates, wp_update_template |
| Global Styles | 2 | wp_get_global_styles, wp_update_global_styles |
| Site Settings | 2 | wp_get_site_settings, wp_update_site_settings |

### Esempi di chiamata

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "wp_list_posts",
    "arguments": {"per_page": 10, "status": "publish"}
  }
}
```

---

[Torna alla panoramica](index.md) | [Installazione](installazione.md) | [Configurazione](configurazione.md) | [Sicurezza](sicurezza.md)
