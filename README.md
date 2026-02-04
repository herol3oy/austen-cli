# Austen CLI

```
 █████  ██    ██ ███████ ████████ ███████ ███    ██ 
██   ██ ██    ██ ██         ██    ██      ████   ██ 
███████ ██    ██ ███████    ██    █████   ██ ██  ██ 
██   ██ ██    ██      ██    ██    ██      ██  ██ ██ 
██   ██  ██████  ███████    ██    ███████ ██   ████
```

This CLI tool uses AI to analyze books and generate character relationship diagrams in ASCII art directly from the command line.

<https://github.com/user-attachments/assets/d2505946-348d-45f5-90cb-22c182f3b0ae>

## Features

- 🔍 Search any book from Open Library
- 🤖 AI-powered character relationship analysis via Cloudflare Worker
- 🎨 ASCII art diagram rendering in terminal
- 🔗 Shareable browser links for viewing and sharing diagrams


## Usage

### Quick Start

```bash
npx austen generate "Pride and Prejudice"
```

### Or install globally

```bash
npm install -g austen
```

### Generate a diagram

```bash
austen generate "The Art of Computer Programming"

austen generate Misery

```

### View help

```bash
austen --help
austen generate --help
```

## Installation

```bash
git clone https://github.com/herol3oy/austen-cli

cd austen-cli

npm i

npm run build

npm link

austen generate Emma
```

## Development

### Running Tests

```bash
npm t
```

### Building

```bash
npm run build
```


## Example Output

The Old Man and the Sea by Ernest Hemingway (1952)

```ASCII
┌─────────────┐            ┌─────────┐
│             │            │         │
│   Santiago  ├Apprentice─►┤ Manolin │
│             │            │         │
└──────┬──────┘            └─────────┘
       │                              
       │                              
       │                              
   Adversary                          
       │                              
       │                   ┌─────────┐
       │                   │         │
       ├──────────────────►│  Marlin │
       |                   │         │
       │                   └─────────┘
       │                              
       │                              
       │                              
  Adversaries                              
       │                              
       │                   ┌─────────┐
       │                   │         │
       └──────────────────►│  Sharks │
                           │         │
                           └─────────┘

```

## How It Works

1. **Search**: Searches Open Library for books matching your query
2. **Select**: Lets you choose from the top 5 search results
3. **Analyze**: Uses DeepSeek AI via Cloudflare Worker to analyze character relationships
4. **Render**: Displays ASCII art diagram in your terminal
5. **Share**: Generates a shareable link so you can view and share the diagram in a browser


## Tech Stack

- **TypeScript** - Type-safe development
- **Commander.js** - CLI framework
- **Inquirer** - Interactive prompts
- **Ora** - Loading spinners
- **Chalk** - Colored output
- **Beautiful Mermaid** - Converting Mermaid syntax to ASCII
- **Cloudflare Workers** - Serverless AI endpoint (DeepSeek integration)

> **Note**: The Cloudflare Worker is pre-deployed and hardcoded in the CLI for simplicity. No environment setup required!

## API Credits

- [Open Library](https://openlibrary.org) - Book data
- [DeepSeek](https://deepseek.com) - AI analysis
- [Cloudflare Workers](https://workers.cloudflare.com) - Serverless platform


## Related Projects

- [Austen Web App](https://github.com/herol3oy/austen) - Full-featured Next.js web application
