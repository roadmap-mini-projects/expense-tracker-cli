import * as path from 'path';
import { CommandRouter } from './command-router';
import { ExpenseRepository } from './repositories/expense.repository';

/**
 * Entry point for the CLI application.
 * Initializes the expense repository, processes command-line arguments, and routes the appropriate command.
 * 
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
  const filePath = path.join(__dirname, '../expenses.json');
  const args = process.argv.slice(2); // args from CLI
  const commandName = args[0]; // first command (e.g., 'addExpense')
  const commandArgs = args.slice(1); 

  const expenseRepository = new ExpenseRepository(filePath);

  await expenseRepository.initialize();

  const router = new CommandRouter(expenseRepository);

  await router.route(commandName, commandArgs);
}

main().catch((error) => {
  console.error('Error initialzing application: ', error);
  process.exit(1);
});
