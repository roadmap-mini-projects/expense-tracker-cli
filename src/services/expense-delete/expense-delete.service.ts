import { LoggerWinston } from '../../config/logger';
import { Expense } from '../../models/expense.model';
import { ExpenseRepository } from '../../repositories/expense.repository';

export class ExpenseDeleteService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
  }

  /**
   * Deletes an expense by its ID.
   * @param id - ID of the expense to delete.
   */
  public async deleteExpense(name: string): Promise<Expense> {
    try {
      // Retrieve and delete the expense
      const expense = await this.expenseRepository.getExpenseByName(name);
      await this.expenseRepository.deleteExpense(name);
      return expense;
    } catch (error) {
      throw new Error('Error delete expense');
    }
  }
}
