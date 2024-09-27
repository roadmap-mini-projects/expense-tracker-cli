import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class GetExpenseCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of GetExpenseCommand.
   *
   * @param expenseRepository - The repository responsible for managing expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Get - Expense');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  /**
   * Executes the command to retrieve an expense.
   *
   * @returns {Promise<void>}
   */
  public async execute(): Promise<void> {
    try {
      await this.expenseController.getExpense();
    } catch (error) {
      this.logger.error(`Error retrieving expense: ${error}`);
    }
  }
}
