import { LoggerWinston } from '../config/logger';
import { ExpenseController } from '../controllers/expense.controller';
import { ExpenseRepository } from '../repositories/expense.repository';

export class AddExpenseCommand {
  private readonly logger: LoggerWinston;
  private readonly expenseController: ExpenseController;

  /**
   * Creates an instance of AddExpenseCommand.
   *
   * @param expenseRepository - An instance of ExpenseRepository for managin expenses.
   */
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new LoggerWinston('Add - Expense');
    this.expenseController = new ExpenseController(this.expenseRepository);
  }

  /**
   * Executes the command to add a new expense.
   *
   * @returns {Promise<void>}
   */
  public async execute(): Promise<void> {
    try {
      const expense = await this.expenseController.addExpense();
      this.logger.log('info', `Added: ${expense.name} [${expense.amount}]`);
    } catch (error) {
      this.logger.error('Failed to add expense, error: ', error);
    }
  }
}
