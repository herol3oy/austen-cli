import assert from 'node:assert';
import test from 'node:test';
import { analyzeCharacters } from './deepseek.js';

test('analyzeCharacters throws error when API key is missing', async () => {
  await assert.rejects(
    async () => {
      await analyzeCharacters('Pride and Prejudice', 'Jane Austen', '');
    },
    {
      name: 'Error',
      message: 'DeepSeek API key is required. Set DEEPSEEK_API_KEY in your .env file'
    }
  );
});

test('analyzeCharacters throws error when API key is undefined', async () => {
  await assert.rejects(
    async () => {
      await analyzeCharacters('Pride and Prejudice', 'Jane Austen', undefined as any);
    },
    {
      name: 'Error',
      message: 'DeepSeek API key is required. Set DEEPSEEK_API_KEY in your .env file'
    }
  );
});

test('analyzeCharacters throws error for invalid API key', async () => {
  await assert.rejects(
    async () => {
      await analyzeCharacters('Pride and Prejudice', 'Jane Austen', 'invalid_key_12345');
    },
    {
      name: 'Error',
      message: /Invalid DeepSeek API key/
    }
  );
});

test('analyzeCharacters returns mermaid diagram with valid inputs', async () => {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    // Skip test if no API key is available
    console.log('⚠️  Skipping test: DEEPSEEK_API_KEY not set');
    return;
  }

  const result = await analyzeCharacters(
    'Pride and Prejudice',
    'Jane Austen',
    apiKey
  );

  assert.ok(result);
  assert.ok(typeof result === 'string');
  assert.ok(result.length > 0);
  
  // Should contain mermaid graph syntax
  assert.ok(result.includes('graph') || result.includes('flowchart'));
});

test('analyzeCharacters handles book title and author parameters', async () => {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    console.log('⚠️  Skipping test: DEEPSEEK_API_KEY not set');
    return;
  }

  const result = await analyzeCharacters(
    '1984',
    'George Orwell',
    apiKey
  );

  assert.ok(result);
  assert.ok(typeof result === 'string');
  assert.ok(result.length > 0);
});
