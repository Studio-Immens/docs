# .files — Gestione centralizzata dei file di configurazione

> **Repo:** `studio-immens/.files`  
> **Categoria:** Prodotto / Tooling  
> **Linguaggio:** Principalmente Shell, Lua, YAML  

## Panoramica

`.files` è il repository di dotfiles centralizzato di Studio Immens. Offre un sistema dichiarativo per gestire configurazioni di shell, editor, terminale e strumenti di sviluppo in modo portabile e versionato.

L'obiettivo è mantenere un ambiente di sviluppo coerente su più macchine (Linux, macOS) senza duplicazione.

## Tech Stack

| Componente | Tecnologia |
|---|---|
| Shell | Zsh + Zinit |
| Editor | Neovim (Lua) |
| Tema | Catppuccin Mocha |
| Prompt | Starship |
| Gestione dotfiles | GNU Stow + script custom |
| TMUX | tmux + tmux-resurrect |
| Font | JetBrains Mono Nerd Font |
| Multiplexer | tmux |

## Setup

### Prerequisiti

- `git`
- `stow` (o `brew install stow` su macOS)
- `zsh` come shell predefinita
- `curl` o `wget`

### Installazione rapida

```bash
git clone https://github.com/studio-immens/.files.git ~/.files
cd ~/.files
make install
```

Il `Makefile` si occuperà di:
1. Installare Zinit (plugin manager per Zsh)
2. Collegare tramite `stow` le configurazioni nella home
3. Installare i plugin Neovim tramite Lazy.nvim
4. Configurare Starship prompt

### Makefile targets principali

```bash
make install    # Installazione completa
make link       # Solo symlink con stow
make update     # Aggiorna plugin e dipendenze
make clean      # Rimuove symlink
```

## Struttura delle directory

```
.files/
├── zsh/          # Configurazione Zsh (aliases, exports, functions)
├── nvim/         # Configurazione Neovim (LazyVim-based)
├── tmux/         # Configurazione tmux
├── starship/     # Configurazione Starship prompt
├── git/          # Config gitconfig e aliases
├── scripts/      # Utility script vari
├── Makefile      # Automazione installazione
└── README.md     # Documentazione principale
```

## Esempi

### Aggiungere un alias globale

Aggiungi in `zsh/aliases.zsh`:

```zsh
alias gco='git checkout'
alias gst='git status'
alias dps='docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
```

### Configurazione Neovim

I plugin sono gestiti in `nvim/lua/plugins/` con Lazy.nvim:

```lua
return {
  "nvim-telescope/telescope.nvim",
  dependencies = { "nvim-lua/plenary.nvim" },
  config = function()
    require("telescope").setup({})
  end,
}
```

## Link utili

- [Repo GitHub](https://github.com/studio-immens/.files)
- [GNU Stow](https://www.gnu.org/software/stow/)
- [Catppuccin Theme](https://catppuccin.com/)
