import { LoggerWinston } from '../../config/logger';
import { UpdateExpenseDto } from '../../models/dtos/update-expense.dto';
import { Expense } from '../../models/expense.model';
import { ExpenseRepository } from '../../repositories/expense.repository';
import { ExpenseValidationService } from '../expense-validation/expense-validation.service';

export class ExpenseUpdateService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;
  private readonly expenseValidation: ExpenseValidationService;

  constructor(
    expenseRepository: ExpenseRepository,
    expenseValidation: ExpenseValidationService
  ) {
    this.logger = new LoggerWinston('Update - Service');
    this.expenseRepository = expenseRepository;
    this.expenseValidation = expenseValidation;
  }

  /**
   * Updates an existing expense by its NAME.
   * @param name - NAME of the expense to update.
   * @param updateExpenseDto - DTO with updated expense data.
   */
  public async updateExpense(
    name: string,
    updateExpenseDto: UpdateExpenseDto
  ): Promise<Expense> {
    try {
      // Validate data
      this.expenseValidation.validateUpdateExpense(updateExpenseDto);

      // Retrieve and update the expense
      const expense = await this.expenseRepository.getExpenseByName(name);
      Object.assign(expense, updateExpenseDto, { updatedAt: new Date() });
      await this.expenseRepository.saveExpensesToFile();
      return expense;
    } catch (error) {
      throw new Error('Error update expense');
    }
  }
}
