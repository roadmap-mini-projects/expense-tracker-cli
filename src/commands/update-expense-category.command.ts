import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class UpdateExpenseCategoryCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of UpdateExpenseCategoryCommand.
   *
   * @param expenseRepository - The repository responsible for managing expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Update - Category');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  /**
   * Executes the command to update the category of an expense.
   *
   * @returns {Promise<void>}
   */
  public async execute(): Promise<void> {
    try {
      await this.expenseController.updateCategory();
      this.logger.info('Category updated successfully');
    } catch (error) {
      this.logger.error('Failed update category, error: ', error);
    }
  }
}
