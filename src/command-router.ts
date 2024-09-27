import { AddExpenseCommand } from './commands/add-expense.command';
import { DeleteExpenseCommand } from './commands/delete-expense.command';
import { GetExpenseCommand } from './commands/get-expense.command';
import { ICommand } from './commands/interfaces/command.interface';
import { ListExpensesCommand } from './commands/list-expense.command';
import { UpdateExpenseCategoryCommand } from './commands/update-expense-category.command';
import { UpdateExpenseStatusCommand } from './commands/update-expense-status.command';
import { UpdateExpenseCommand } from './commands/update-expense.command';
import { ExpenseRepository } from './repositories/expense.repository';

type CommmandConstructor = new (
  expenseRepository: ExpenseRepository
) => ICommand;

export class CommandRouter {
  private expenseRepository: ExpenseRepository;
  private readonly commandRegistry: Map<string, CommmandConstructor>;

  /**
   * Creates an instance of CommandRouter
   * @param expenseRepository
   */
  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
    this.commandRegistry = new Map<string, CommmandConstructor>([
      ['add-expense', AddExpenseCommand],
      ['update-expense', UpdateExpenseCommand],
      ['update-expense-status', UpdateExpenseStatusCommand],
      ['update-expense-category', UpdateExpenseCategoryCommand],
      ['list-expense', ListExpensesCommand],
      ['delete-expense', DeleteExpenseCommand],
      ['get-expense', GetExpenseCommand],
    ]);
  }

  /**
   * Routes the command to its respective handler
   *
   * @param commandName
   * @param args
   * @returns {Promise<void>}
   */
  public async route(commandName: string, args: string[]): Promise<void> {
    const CommandClass = this.commandRegistry.get(commandName);

    if (!CommandClass) {
      console.log(`Command "${commandName}" not found.`);
      return;
    }

    const commandInstance = new CommandClass(this.expenseRepository);
    await commandInstance.execute(args);
  }
}
