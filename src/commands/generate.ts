import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
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
      const { selectedBook } = await inquirer.prompt([
        {
          type: 'rawlist',
          name: 'selectedBook',
          message: 'Select a book:',
          choices: books.map((book) => ({
            name: `${book.title} by ${book.author_name}${book.firstPublishYear ? ` (${book.firstPublishYear})` : ''}`,
            value: book,
          })),
        },
      ]);

      // Analyze characters with AI
      const apiKey = process.env.DEEPSEEK_API_KEY;
      if (!apiKey) {
        console.log(chalk.red('\n❌ Error: DEEPSEEK_API_KEY not found in environment variables'));
        console.log(chalk.yellow('Please create a .env file with your DeepSeek API key'));
        return;
      }

      const analyzeSpinner = ora('Analyzing character relationships with AI...').start();
      const mermaidSyntax = await analyzeCharacters(
        selectedBook.title,
        selectedBook.author_name,
        apiKey
      );
      analyzeSpinner.succeed('Analysis complete!');

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
