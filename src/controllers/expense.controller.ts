import { ExpenseRepository } from '../repositories/expense.repository';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { ExpenseCommandHandler } from './expense-handler/expense-command.handler';
import { ExpensePromptService } from '../services/expense-prompt/expense-prompt.service';

export class ExpenseController {
  private readonly commandHandler: ExpenseCommandHandler;
  private readonly expenseService: ExpenseService;
  private readonly promptService: ExpensePromptService;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseService = new ExpenseService(expenseRepository);
    this.promptService = new ExpensePromptService();
    this.commandHandler = new ExpenseCommandHandler(
      this.expenseService,
      this.promptService
    );
  }

  async addExpense(): Promise<Expense> {
    return await this.commandHandler.promptAddExpense();
  }

  async updateExpense(): Promise<void> {
    await this.commandHandler.promptUpdateExpense();
  }

  async updateStatus(): Promise<void> {
    await this.commandHandler.promptUpdateStatus();
  }

  async updateCategory(): Promise<void> {
    await this.commandHandler.promptUpdateCategory();
  }

  async listExpenses(): Promise<Expense[]> {
    return await this.commandHandler.promptListExpense();
  }

  async deleteExpense(): Promise<void> {
    await this.commandHandler.promptDeleteExpense();
  }

  async getExpense(): Promise<void> {
    await this.commandHandler.promptGetExpense();
  }
}
