import { LoggerWinston } from '../../config/logger';
import { Status } from '../../models/enums/status.enum';
import { Expense } from '../../models/expense.model';
import { ExpenseRepository } from '../../repositories/expense.repository';

export class ExpenseListService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
  }
  /**
   * Lists expenses, optionally filtered by their status.
   * @param status - Optional status filter.
   */
  public async listExpenses(status?: Status): Promise<Expense[]> {
    try {
      const expenses = await this.expenseRepository.getExpenses();
      const filteredExpenses = status
        ? expenses.filter((exp) => exp.status === status)
        : expenses;

      if (filteredExpenses.length === 0) {
        console.log('mmmNo expenses found');
      }
      return filteredExpenses;
    } catch (error) {
      throw new Error('Error listing expenses: ' + error);
    }
  }
}
