import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class DeleteExpenseCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of DeleteExpenseCommand.
   *
   * @param expenseRepository - An instance of ExpenseRepository for managing expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Delete - Expense');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  /**
   * Executes the command to delete an existing expense.
   *
   * @returns {Promise<void>}
   */
  public async execute(): Promise<void> {
    try {
      await this.expenseController.deleteExpense();
      this.logger.info('Delete successfully');
    } catch (error) {
      this.logger.error('Error deleting expense: ', error);
    }
  }
}
