# Austen CLI Cloudflare Worker

This worker handles DeepSeek AI analysis for character relationships and hosts shareable diagram links.

## Setup

1. **Install Wrangler** (Cloudflare CLI):
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Create KV Namespace**:
   ```bash
   cd worker
   # Create production namespace
   wrangler kv:namespace create "DIAGRAMS"
   # Create preview namespace for development
   wrangler kv:namespace create "DIAGRAMS" --preview
   ```
   
   Update the `id` and `preview_id` values in `wrangler.toml` with the IDs from the output.

4. **Add DeepSeek API Key as a secret**:
   ```bash
   wrangler secret put DEEPSEEK_API_KEY
   # Paste your DeepSeek API key when prompted
   ```

5. **Deploy the worker**:
   ```bash
   wrangler deploy
   ```

6. **Copy the deployed URL** and add it to your CLI's `.env` file:
   ```
   CLOUDFLARE_WORKER_URL=https://austen-worker.your-subdomain.workers.dev
   ```

## Development

To test locally:
```bash
wrangler dev
```

## API Endpoints

### POST /
Generate character relationship diagram.

Request body:
```json
{
  "bookTitle": "Pride and Prejudice",
  "author": "Jane Austen"
}
```

Response:
```json
{
  "mermaidSyntax": "graph LR\n  E[Elizabeth] -->|Sister| J[Jane]\n  ...",
  "shareUrl": "https://austen-cli-worker.potato0.workers.dev/abc123xyz",
  "diagramId": "abc123xyz"
}
```

### POST /upload
Upload ASCII art for a diagram (called by CLI).

Request body:
```json
{
  "diagramId": "abc123xyz",
  "ascii": "┌─────────┐\n│ Character │\n└─────────┘",
  "bookTitle": "Pride and Prejudice",
  "author": "Jane Austen"
}
```

### GET /{diagramId}
View shareable diagram in browser.

Returns HTML page with ASCII art.

## Environment Variables

- `DEEPSEEK_API_KEY` - Your DeepSeek API key (secret)

## KV Storage

The worker uses Cloudflare KV to store diagrams for 30 days. Each diagram is stored with:
- `diagramId` - Unique identifier
- `bookTitle` - Book title
- `author` - Author name
- `mermaidSyntax` - Mermaid diagram syntax
- `ascii` - Rendered ASCII art
- `createdAt` - Timestamp
