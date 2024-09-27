import { LoggerWinston } from '../../config/logger';
import { ExpenseCategory } from '../../models/enums/expense-category.enum';
import { ExpenseRepository } from '../../repositories/expense.repository';

export class ExpenseUpdateCategoryService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
  }
  public async updateExpenseCategory(
    name: string,
    category: ExpenseCategory
  ): Promise<void> {
    try {
      const expense = await this.expenseRepository.getExpenseByName(name);
      expense.category = category;
      expense.updatedAt = new Date();
      await this.expenseRepository.saveExpensesToFile();
    } catch (error) {
      this.logger.error('Error update category');
    }
  }
}
