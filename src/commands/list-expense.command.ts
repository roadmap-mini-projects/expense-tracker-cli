import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class ListExpensesCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of ListExpensesCommand.
   *
   * @param expenseRepository - The repository responsible for managing expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('List - Expenses');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  /**
   * Executes the command to list all expenses.
   *
   * @returns {Promise<void>}
   */
  public async execute(): Promise<void> {
    try {
      const expenses = await this.expenseController.listExpenses();
      if (expenses.length === 0) {
        this.logger.info('No expenses found');
      } else {
        expenses.forEach((expense, index) => {
          this.logger.info(
            `Expense #${++index}: ${expense.name} - ${expense.amount}`
          );
        });
        this.logger.info(`Total Expenses: ${expenses.length}`);
      }
    } catch (error) {
      this.logger.error('Error listing expenses, error: ', error);
    }
  }
}
