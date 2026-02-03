export const CHARACTER_ANALYSIS_PROMPT = `
You're a bookworm. Given a book title and author, create a very simple and uncomplicated
 character graph using valid Mermaid JS syntax.

Do not include any explanations or language indicators.

Example result for "The Wonderful Wizard of Oz" by "L. Frank Baum":

graph LR
  A[Dorothy Gale] -->|Pet| B[Toto]
  A -->|Family| C[Uncle Henry and Aunt Em]
  A -->|Friends| D[Scarecrow]
  A -->|Friends| E[Tin Woodman]
  A -->|Friends| F[Cowardly Lion]
  A -->|Enemy| G[The Wicked Witch of The West]
  A -->|Enemy| H[The Wizard of OZ]
  A -->|Helps Dorothy| I[Glinda]
  D -->|Friends| E
  E -->|Friends| F
  B -->|In Kansas| C
`;
