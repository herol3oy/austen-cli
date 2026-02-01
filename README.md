# Austen CLI

> Generate ASCII diagrams for book character relationships from the command line

A CLI tool that uses AI to analyze books and create beautiful character relationship diagrams using Mermaid syntax and ASCII art.

## Features

- 🔍 Search any book from Open Library
- 🤖 AI-powered character relationship analysis (DeepSeek)
- 🎨 ASCII art diagram rendering in terminal
- 📊 Generate Mermaid diagram syntax
- 💻 Simple command-line interface


## Installation

### Global Installation

```bash
npm install -g austen-cli
```

### Local Development

```bash
git clone https://github.com/herol3oy/austen-cli
cd austen-cli
npm install
npm run build
npm link
```

## Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your DeepSeek API key to `.env`:
   ```env
   DEEPSEEK_API_KEY=your_api_key_here
   ```

   Get your API key from [DeepSeek](https://platform.deepseek.com/)

## Usage

### Generate a diagram

```bash
austen generate "Pride and Prejudice"
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
│   Santiago  ├ACarestfor─►┤ Manolin │
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
  Adversaries              │         │
       │                   └─────────┘
       │                              
       │                              
       │                              
       │                              
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
3. **Analyze**: Uses DeepSeek AI to analyze character relationships
4. **Render**: Displays ASCII art diagram in your terminal

## Development

```bash
# Run in development mode
npm run dev generate "Book Title"

# Build
npm run build
```

## Tech Stack

- **TypeScript** - Type-safe development
- **Commander.js** - CLI framework
- **Axios** - HTTP client
- **Inquirer** - Interactive prompts
- **Ora** - Loading spinners
- **Chalk** - Colored output
- **Beautiful Mermaid** - ASCII diagram rendering
- **OpenAI SDK** - DeepSeek API integration

## API Credits

- [Open Library](https://openlibrary.org) - Book data
- [DeepSeek](https://deepseek.com) - AI analysis


## Related Projects

- [Austen Web App](https://github.com/herol3oy/austen) - Full-featured Next.js web application
