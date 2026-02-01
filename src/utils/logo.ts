import figlet from 'figlet';
import chalk from 'chalk';

export function displayLogo(): void {
  const logo = figlet.textSync('AUSTEN', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });

  console.log(chalk.cyan(logo));
  console.log(chalk.gray('  Generate character relationship diagrams for any book\n'));
}
