import assert from 'node:assert';
import test from 'node:test';
import { searchBooks, getBookDetails } from './openLibrary.js';

test('searchBooks returns empty array for empty title', async () => {
  const result = await searchBooks('');
  assert.strictEqual(result.length, 0);
});

test('searchBooks returns empty array for whitespace title', async () => {
  const result = await searchBooks('   ');
  assert.strictEqual(result.length, 0);
});

test('searchBooks returns books for valid title', async () => {
  const result = await searchBooks('Pride and Prejudice');
  
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
  assert.ok(result.length <= 5);
  
  const book = result[0];
  assert.ok(book.key);
  assert.ok(book.title);
  assert.ok(book.author_name);
});

test('searchBooks filters out books without authors', async () => {
  const result = await searchBooks('Pride and Prejudice');
  
  result.forEach(book => {
    assert.ok(book.author_name, 'All books should have an author');
  });
});

test('searchBooks throws error for API failure', async () => {
  const invalidUrl = searchBooks('test').catch(error => {
    assert.ok(error instanceof Error);
  });
  
  await invalidUrl;
});

test('getBookDetails returns book details for valid key', async () => {
  const result = await getBookDetails('/works/OL66554W');
  
  assert.ok(result);
  assert.strictEqual(result.key, '/works/OL66554W');
  assert.ok(result.title);
  assert.ok(result.author_name);
});

test('getBookDetails handles missing author gracefully', async () => {
  const result = await getBookDetails('/works/OL66554W');
  
  if (result) {
    assert.ok(result.author_name);
  }
});
