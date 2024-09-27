import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class UpdateExpenseStatusCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of UpdateExpenseStatusCommand.
   *
   * @param expenseRepository - The repository responsible for managing expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Update - Status');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  public async execute(): Promise<void> {
    try {
      await this.expenseController.updateStatus();
      this.logger.info(`Status update`);
    } catch (error) {
      this.logger.error('Failed update status, error: ', error);
    }
  }
}
