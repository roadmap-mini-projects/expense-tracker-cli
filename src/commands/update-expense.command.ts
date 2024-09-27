import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class UpdateExpenseCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of UpdateExpenseCommand.
   *
   * @param expenseRepository - The repository responsible for managing expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Update - Expense');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  /**
   * Executes the command to update an expense.
   *
   * This method calls the `ExpenseController` to prompt the user for the
   * necessary details, logs the result of the update, and handles errors
   * if the update fails.
   */
  public async execute(): Promise<void> {
    try {
      await this.expenseController.updateExpense();
      this.logger.info(`Updated successfuly`);
    } catch (error) {
      this.logger.error('Error updating expense, error: ', error);
    }
  }
}
