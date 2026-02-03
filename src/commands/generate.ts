import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { confirm, select } from '@inquirer/prompts';
import { renderMermaidAscii } from 'beautiful-mermaid';
import { searchBooks } from '../api/openLibrary.js';
import { analyzeCharacters } from '../api/deepseek.js';
import { displayLogo } from '../utils/logo.js';

export const generateCommand = new Command('generate')
  .description('Generate a Mermaid diagram for book character relationships')
  .argument('<book-title>', 'The title of the book to analyze')
  .action(async (bookTitle: string) => {
    try {
      displayLogo();

      // Search for books
      const searchSpinner = ora('Searching for books...').start();
      const books = await searchBooks(bookTitle);
      searchSpinner.succeed(`Found ${books.length} books\n`);

      if (books.length === 0) {
        console.log(chalk.yellow(`No books found for "${bookTitle}"`));
        return;
      }

      // Let user select a book
      const selectedBook = await select({
        message: 'Select a book:',
        choices: books.map((book) => ({
          name: `${book.title} by ${book.author_name}${book.firstPublishYear ? ` (${book.firstPublishYear})` : ''}`,
          value: book,
        })),
      });

      // Analyze characters with AI
      const apiKey = process.env.DEEPSEEK_API_KEY;

      let mermaidSyntax: string;
      if (!apiKey) {
        console.log(chalk.yellow("\n⚠️  You haven't provided DEEPSEEK_API_KEY."));
        const shouldUseMock = await confirm({
          message: 'Would you like me to show a sample result instead?',
          default: true,
        });

        if (!shouldUseMock) return;

        mermaidSyntax = `graph LR
  A[Main Character] -->|Friend| B[Close Friend]
  A -->|Family| C[Family Member]
  A -->|Rival| D[Rival]
  B -->|Knows| C`;
      } else {
        const analyzeSpinner = ora('Analyzing character relationships with AI...').start();
        mermaidSyntax = await analyzeCharacters(
          selectedBook.title,
          selectedBook.author_name,
          apiKey
        );
        analyzeSpinner.succeed('Analysis complete!');
      }

      // Render ASCII diagram
      console.log(chalk.cyan('\n📊 Character Relationship Diagram:\n'));
      try {
        const ascii = renderMermaidAscii(mermaidSyntax);
        console.log(ascii);
      } catch (error) {
        console.log(chalk.yellow('Could not render ASCII diagram, showing Mermaid syntax instead:\n'));
        console.log(mermaidSyntax);
      }
      
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });
