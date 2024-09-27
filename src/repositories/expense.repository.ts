import * as fs from 'fs';
import { Expense } from '../models/expense.model';
import { ExpenseRepositoryInterface } from './interfaces/expense.repository.interface';
import { LoggerWinston } from '../config/logger';
import { ExpenseError } from '../errors/expense.errors';
import { UpdateExpenseDto } from '../models/dtos/update-expense.dto';

export class ExpenseRepository implements ExpenseRepositoryInterface {
  private readonly logger: LoggerWinston;
  private readonly filePath: string;
  public expenses: Expense[] = [];

  constructor(filePath: string) {
    this.logger = new LoggerWinston('ExpenseRepository');
    this.filePath = filePath;
    this.initialize().catch((error) => {
      this.logger.error('Failed to initialize');
    });
  }

  public async initialize(): Promise<void> {
    await this.initializeExpenses();
  }

  private async fileExist(): Promise<boolean> {
    try {
      await fs.promises.access(this.filePath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
  private async createEmptyFile(): Promise<void> {
    const initialContent = JSON.stringify([]);
    try {
      return await fs.promises.writeFile(
        this.filePath,
        initialContent,
        'utf-8'
      );
    } catch (error) {
      throw new Error('error creating file empty');
    }
  }

  private async loadExpenses(): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      this.expenses = JSON.parse(data);
    } catch (error) {
      throw ExpenseError.loadExpenseError();
    }
  }

  /**
   * Initializes the expenses by loading them from the file.
   * If the file does not exist, it creates an empty file.
   */
  private async initializeExpenses(): Promise<void> {
    const fileExist = await this.fileExist();
    if (!fileExist) {
      await this.createEmptyFile();
    } else {
      await this.loadExpenses();
    }
  }

  /**
   * Retrieves all expenses from the file.
   */
  public async getExpenses(): Promise<Expense[]> {
    try {
      return this.expenses;
    } catch (error) {
      this.logger.log('error', 'Error reading');
      throw ExpenseError.notFoundExpenses();
    }
  }

  /**
   * Retrieves a specific expense by its ID.
   * @param id - ID of the expense to retrieve.
   */
  public async getExpenseByName(name: string): Promise<Expense> {
    const expenses = await this.getExpenses();
    const expense = expenses.find((expense) => expense.name === name);

    if (!expense) {
      throw ExpenseError.expenseNotFoundError(name);
    }

    return expense;
  }

  /**
   * Adds a new expense to the repository after validating it.
   * @param addExpenseDto - DTO containing expense data.
   */
  public async addExpense(expense: Expense): Promise<void> {
    const expenses = await this.getExpenses();
    const exist = await this.getExpenseExist(expense.name);

    if (exist) {
      throw ExpenseError.existExpenseError(expense.name);
    }

    expenses.push(expense);
    await this.saveExpensesToFile();
  }

  /**
   * Updates an existing expense by its NAME.
   * @param name - NAME of the expense to update.
   * @param updateExpenseDto - DTO with updated expense data.
   */
  public async updateExpense(
    name: string,
    expenseData: UpdateExpenseDto
  ): Promise<void> {
    const expense = this.expenses.find((expense) => expense.name === name);

    if (!expense) {
      throw ExpenseError.expenseNotFoundError(name);
    }

    Object.assign(expense, expenseData, { updatedAt: new Date() });
    await this.saveExpensesToFile();
  }

  /**
   * Deletes an expense by its ID.
   * @param id - ID of the expense to delete.
   */
  public async deleteExpense(name: string): Promise<void> {
    const expenses = await this.getExpenses();
    const expenseIndex = expenses.findIndex((expense) => expense.name === name);

    if (expenseIndex === -1) {
      throw ExpenseError.expenseNotFoundError(name);
    }

    this.expenses.splice(expenseIndex, 1);
    await this.saveExpensesToFile();
    this.logger.info(`Expense deleted successfully (NAME: ${name})`);
  }

  public async getExpenseExist(name: string): Promise<boolean> {
    const expenses = await this.getExpenses();
    return expenses.some((expense) => expense.name === name);
  }

  /**
   * Saves the current state of the expenses array to the file.
   */
  public async saveExpensesToFile(): Promise<void> {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.expenses, null, 2)
      );
    } catch (error) {
      throw ExpenseError.saveError();
    }
  }
}
