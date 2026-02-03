# Austen CLI

> Generate ASCII diagrams for book character relationships from the command line

A CLI tool that uses AI to analyze books and create character relationship diagrams using Mermaid syntax and ASCII art.

## Features

- 🔍 Search any book from Open Library
- 🤖 AI-powered character relationship analysis via Cloudflare Worker
- 🎨 ASCII art diagram rendering in terminal

## Installation

```bash
git clone https://github.com/herol3oy/austen-cli

cd austen-cli

npm i

npm run build

npm link
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

## Usage

### Generate a diagram

```bash
austen generate "Pride and Prejudice"

austen generate Emma

austen generate "The Art of Computer Programming"
```

### View help

```bash
austen --help
austen generate --help
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
