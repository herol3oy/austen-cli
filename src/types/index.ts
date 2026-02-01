export interface Book {
  key: string;
  title: string;
  author_name: string;
  firstPublishYear?: number;
  description?: string;
}

export interface CharacterRelationship {
  from: string;
  to: string;
  relationship: string;
}

export interface MermaidDiagram {
  syntax: string;
  theme?: string;
}

