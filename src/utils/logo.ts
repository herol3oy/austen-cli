import chalk from 'chalk'

const AUSTEN_ASCII_LOGO = `
 █████  ██    ██ ███████ ████████ ███████ ███    ██ 
██   ██ ██    ██ ██         ██    ██      ████   ██ 
███████ ██    ██ ███████    ██    █████   ██ ██  ██ 
██   ██ ██    ██      ██    ██    ██      ██  ██ ██ 
██   ██  ██████  ███████    ██    ███████ ██   ████
`

export function displayLogo() {
  console.log(
    chalk.cyanBright(AUSTEN_ASCII_LOGO) +
    '\n' +
    chalk.gray('CLI tool to generate diagrams for book character relationships')
  )
}
