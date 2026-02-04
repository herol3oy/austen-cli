import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import { renderMermaidAscii } from 'beautiful-mermaid';
import { searchBooks } from '../api/openLibrary.js';
import { analyzeCharactersFromWorker, uploadAsciiToWorker } from '../api/worker.js';
import { displayLogo } from '../utils/logo.js';

// Cloudflare Worker URL for character analysis
const WORKER_URL = 'https://austen-cli-worker.potato0.workers.dev';

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

      // Analyze characters with AI using Cloudflare Worker
      const analyzeSpinner = ora('Analyzing character relationships with AI...').start();
      let workerResponse;
      try {
        workerResponse = await analyzeCharactersFromWorker(
          selectedBook.title,
          selectedBook.author_name,
          WORKER_URL
        );
        analyzeSpinner.succeed('Analysis complete!');
      } catch (error) {
        analyzeSpinner.fail('Worker request failed');
        throw error;
      }

      // Render ASCII diagram
      console.log(chalk.cyan('\n📊 Character Relationship Diagram:\n'));
      let ascii = '';
      try {
        ascii = renderMermaidAscii(workerResponse.mermaidSyntax);
        console.log(ascii);
      } catch (error) {
        console.log(chalk.yellow('Could not render ASCII diagram, showing Mermaid syntax instead:\n'));
        console.log(workerResponse.mermaidSyntax);
      }

      // Upload ASCII to worker and display shareable link
      if (workerResponse.shareUrl && workerResponse.diagramId && ascii) {
        const uploadSpinner = ora('Generating shareable link...').start();
        try {
          await uploadAsciiToWorker(
            workerResponse.diagramId,
            ascii,
            selectedBook.title,
            selectedBook.author_name,
            WORKER_URL
          );
          uploadSpinner.succeed('Shareable link generated!');
          console.log(chalk.green('\n🔗 Share this diagram:'));
          console.log(chalk.bold.blue(`   ${workerResponse.shareUrl}\n`));
        } catch (error) {
          uploadSpinner.fail('Could not generate shareable link');
        }
      }
      
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      process.exit(1);
    }
  });
