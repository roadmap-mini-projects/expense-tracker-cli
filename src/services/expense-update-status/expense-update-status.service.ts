import { LoggerWinston } from '../../config/logger';
import { Status } from '../../models/enums/status.enum';
import { ExpenseRepository } from '../../repositories/expense.repository';

export class ExpenseUpdateStatusService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
  }
  /**
   * Updates the status of a specific expense by its ID.
   * @param id - ID of the expense.
   * @param status - New status to set.
   */
  public async updateExpenseStatus(
    name: string,
    status: Status
  ): Promise<void> {
    try {
      const expense = await this.expenseRepository.getExpenseByName(name);
      expense.status = status;
      expense.updatedAt = new Date();
      await this.expenseRepository.saveExpensesToFile();
    } catch (error) {
      this.logger.error('Error update status');
    }
  }
}
