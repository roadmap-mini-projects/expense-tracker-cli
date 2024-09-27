import { v4 as uuidv4 } from 'uuid';
import { AddExpenseDto } from '../../models/dtos/add-expensa.dto';
import { Expense } from '../../models/expense.model';
import { ExpenseRepository } from '../../repositories/expense.repository';
import { ExpenseValidationService } from '../expense-validation/expense-validation.service';
import { LoggerWinston } from '../../config/logger';
import { ExpenseExistService } from '../expense-exist/expense-exist.service';

export class ExpenseCreateService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;
  private readonly expenseValidation: ExpenseValidationService;
  private readonly existExpenseService: ExpenseExistService;

  constructor(
    expenseRepository: ExpenseRepository,
    expenseValidation: ExpenseValidationService,
    expenseExist: ExpenseExistService
  ) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
    this.expenseValidation = expenseValidation;
    this.existExpenseService = expenseExist;
  }

  /**
   * Generates a new unique ID for an expense.
   */
  private generateId(): string {
    return uuidv4();
  }

  /**
   * Adds a new expense to the repository after validating it.
   * @param addExpenseDto - DTO containing expense data.
   */
  public async addExpense(addExpenseDto: AddExpenseDto): Promise<Expense> {
    try {
      // Validate the input data
      this.expenseValidation.validateAddExpense(addExpenseDto);

      // Check if the expense already exist
      const exist = await this.existExpenseService.getExpenseExist(addExpenseDto.name);
      if (exist) {
        throw new Error(
          `Expense with name "${addExpenseDto.name}" already exists.`
        );
      }

      // Create new expense
      const id = this.generateId();
      const newExpense: Expense = {
        id: id,
        name: `${addExpenseDto.name}-${id.split('-').pop()}`,
        amount: parseFloat(addExpenseDto.amount.toFixed(2)),
        description: addExpenseDto.description,
        status: addExpenseDto.status,
        category: addExpenseDto.category,

        // ...addExpenseDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the expense to the repository
      this.expenseRepository.addExpense(newExpense);
      // this.logger.info('Expense added');
      return newExpense;
    } catch (error) {
      throw new Error('Error add expense');
    }
  }
}
