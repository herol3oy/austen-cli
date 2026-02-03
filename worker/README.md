# Austen CLI Cloudflare Worker

This worker handles DeepSeek AI analysis for character relationships.

## Setup

1. **Install Wrangler** (Cloudflare CLI):
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Add DeepSeek API Key as a secret**:
   ```bash
   cd worker
   wrangler secret put DEEPSEEK_API_KEY
   # Paste your DeepSeek API key when prompted
   ```

4. **Deploy the worker**:
   ```bash
   wrangler deploy
   ```

5. **Copy the deployed URL** and add it to your CLI's `.env` file:
   ```
   CLOUDFLARE_WORKER_URL=https://austen-worker.your-subdomain.workers.dev
   ```

## Development

To test locally:
```bash
wrangler dev
```

## API Endpoint

**POST /** 
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
  "mermaidSyntax": "graph LR\n  E[Elizabeth] -->|Sister| J[Jane]\n  ..."
}
```

## Environment Variables

- `DEEPSEEK_API_KEY` - Your DeepSeek API key (secret)
