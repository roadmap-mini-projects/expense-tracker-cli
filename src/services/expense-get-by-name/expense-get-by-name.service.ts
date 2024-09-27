import { LoggerWinston } from "../../config/logger";
import { ExpenseError } from "../../errors/expense.errors";
import { Expense } from "../../models/expense.model";
import { ExpenseRepository } from "../../repositories/expense.repository";

export class ExpenseGetByNameService {
  private readonly logger: LoggerWinston;
  private readonly expenseRepository: ExpenseRepository;

  constructor(expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Service');
    this.expenseRepository = expenseRepository;
  }
  /**
   * Get specific expense by its ID.
   * @param name - NAME of the expense.
   */
  public async getExpenseByName(name: string): Promise<Expense> {
    try {
      return await this.expenseRepository.getExpenseByName(name);
    } catch (error) {
      throw ExpenseError.expenseNotFoundError(name);
    }
  }
}