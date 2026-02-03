export interface Book {
  key: string;
  title: string;
  author_name: string;
  firstPublishYear?: number;
}

export interface OpenLibrarySearchDoc {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
}

export interface OpenLibrarySearchResponse {
  docs: OpenLibrarySearchDoc[];
}
