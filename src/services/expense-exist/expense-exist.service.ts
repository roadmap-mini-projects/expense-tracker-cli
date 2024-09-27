import { LoggerWinston } from '../../config/logger';
import { ExpenseRepository } from '../../repositories/expense.repository';

export class ExpenseExistService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
  }
  public async getExpenseExist(name: string): Promise<boolean> {
    const expenses = await this.expenseRepository.getExpenses();
    return expenses.some((expense) => expense.name === name);
  }
}
