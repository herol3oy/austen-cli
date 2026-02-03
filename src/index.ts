#!/usr/bin/env node

import { Command } from 'commander';
import { generateCommand } from './commands/generate.js';

const program = new Command();

program
  .name('austen')
  .description('CLI tool to generate diagrams for book character relationships')
  .version('1.0.0');

program.addCommand(generateCommand);

program.parse(process.argv);
