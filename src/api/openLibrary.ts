import { Book, OpenLibrarySearchResponse } from '../types/index.js';

const OPEN_LIBRARY_API = 'https://openlibrary.org';

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `HTTP ${response.status} ${response.statusText}${text ? `: ${text}` : ''}`
    );
  }

  return (await response.json()) as T;
}

export async function searchBooks(title: string): Promise<Book[]> {
  if (!title.trim()) {
    return [];
  }

  try {
    const url = `${OPEN_LIBRARY_API}/search.json?title=${encodeURIComponent(title)}`;
    const data = await fetcher<OpenLibrarySearchResponse>(url);

    const docs = data.docs || [];

    return docs
      .filter((doc) => doc.author_name && doc.author_name.length > 0)
      .slice(0, 5)
      .map((doc) => ({
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name[0],
        firstPublishYear: doc.first_publish_year,
      }));
  } catch (error) {
    throw new Error(`Failed to search books: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getBookDetails(bookKey: string): Promise<Book | null> {
  try {
    const data = await fetcher<Record<string, any>>(`${OPEN_LIBRARY_API}${bookKey}.json`);

    return {
      key: bookKey,
      title: data.title || 'Unknown Title',
      author_name: data.authors?.[0]?.name || 'Unknown Author',
    };
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    return null;
  }
}
