# HUSH

Voice-controlled live coding music environment. Speak to [Claude Code](https://claude.ai/claude-code), hear [Strudel](https://strudel.cc) patterns.

```
You speak → Claude Code → edits pattern.mjs → server → WebSocket → browser evaluates → music plays
```

## Quick Start

```bash
npm install
npm run hush
```

This launches the server, opens the browser, and starts a Claude Code session — all wired together. Click **play** in the Strudel REPL to initialize audio, then start talking.

> "play a four on the floor beat with some hi-hats"

> "make it slower and add reverb"

> "now layer in a bass line"

## How It Works

Claude Code edits `pattern.mjs`. A file watcher detects the change and pushes the new code to the browser via WebSocket. The browser's Strudel REPL evaluates it instantly — music updates live.

```
┌─────────────┐    ┌─────────────┐    ┌───────────┐    ┌─────────────────┐
│  Your voice  │───▶│ Claude Code  │───▶│ pattern.mjs│───▶│  chokidar watch  │
└─────────────┘    └─────────────┘    └───────────┘    └────────┬────────┘
                                                                │ WebSocket
                                                       ┌────────▼────────┐
                                                       │  Strudel REPL   │
                                                       │  in browser     │
                                                       └─────────────────┘
```

## Project Structure

```
hush/
├── server.mjs        # Express + chokidar + WebSocket server
├── pattern.mjs       # The Strudel pattern file (Claude Code edits this)
├── public/
│   ├── index.html    # Strudel REPL web component + WebSocket client
│   └── style.css     # Dark theme
├── CLAUDE.md         # Instructions for Claude Code
└── package.json
```

## Running Individually

If you prefer to run components separately:

```bash
# Start just the server
npm start

# Then open http://localhost:3000 in your browser
# Then start Claude Code in the hush/ directory
```

## Requirements

- [Node.js](https://nodejs.org) (v18+)
- [Claude Code](https://claude.ai/claude-code) CLI

## License

MIT
