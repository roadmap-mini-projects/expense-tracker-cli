import { ExpenseRepository } from '../repositories/expense.repository';
import { AddExpenseDto } from '../models/dtos/add-expensa.dto';
import { Status } from '../models/enums/status.enum';
import { UpdateExpenseDto } from '../models/dtos/update-expense.dto';
import { Expense } from '../models/expense.model';
import { ExpenseCategory } from '../models/enums/expense-category.enum';
import { ExpenseValidationService } from './expense-validation/expense-validation.service';
import { ExpenseCreateService } from './expense-create/expense-create.service';
import { ExpenseUpdateService } from './expense-update/expense-update.service';
import { ExpenseDeleteService } from './expense-delete/expense-delete.service';
import { ExpenseListService } from './expense-list/expense-list.service';
import { ExpenseGetByNameService } from './expense-get-by-name/expense-get-by-name.service';
import { ExpenseUpdateStatusService } from './expense-update-status/expense-update-status.service';
import { ExpenseUpdateCategoryService } from './expense-update-category/expense-update-category.service';
import { ExpenseExistService } from './expense-exist/expense-exist.service';

export class ExpenseService {
  private readonly expenseRepository: ExpenseRepository;
  private readonly expenseValidation: ExpenseValidationService;
  private readonly addExpenseService: ExpenseCreateService;
  private readonly updateExpenseService: ExpenseUpdateService;
  private readonly deleteExpenseService: ExpenseDeleteService;
  private readonly listExpenseService: ExpenseListService;
  private readonly getByNameExpenseService: ExpenseGetByNameService;
  private readonly updateStatusExpenseService: ExpenseUpdateStatusService;
  private readonly updateCategoryExpenseService: ExpenseUpdateCategoryService;
  private readonly existExpenseService: ExpenseExistService;

  constructor(expenseRepository: ExpenseRepository) {
    this.expenseRepository = expenseRepository;
    this.expenseValidation = new ExpenseValidationService();
    this.existExpenseService = new ExpenseExistService(expenseRepository);
    this.addExpenseService = new ExpenseCreateService(
      expenseRepository,
      this.expenseValidation,
      this.existExpenseService
    );
    this.updateExpenseService = new ExpenseUpdateService(
      expenseRepository,
      this.expenseValidation
    );
    this.deleteExpenseService = new ExpenseDeleteService(expenseRepository);
    this.listExpenseService = new ExpenseListService(expenseRepository);
    this.getByNameExpenseService = new ExpenseGetByNameService(
      expenseRepository
    );
    this.updateStatusExpenseService = new ExpenseUpdateStatusService(
      expenseRepository
    );
    this.updateCategoryExpenseService = new ExpenseUpdateCategoryService(
      expenseRepository
    );
  }

  public async addExpense(addExpenseDto: AddExpenseDto): Promise<Expense> {
    return await this.addExpenseService.addExpense(addExpenseDto);
  }

  public async updateExpense(
    name: string,
    updateExpenseDto: UpdateExpenseDto
  ): Promise<Expense> {
    return await this.updateExpenseService.updateExpense(
      name,
      updateExpenseDto
    );
  }

  public async getByNameExpense(name: string): Promise<Expense> {
    return await this.getByNameExpenseService.getExpenseByName(name);
  }
  public async listExpense(status?: Status): Promise<Expense[]> {
    return await this.listExpenseService.listExpenses(status);
  }
  public async deleteExpense(name: string): Promise<Expense> {
    return await this.deleteExpenseService.deleteExpense(name);
  }
  public async updateExpenseStatus(
    name: string,
    status: Status
  ): Promise<void> {
    return await this.updateStatusExpenseService.updateExpenseStatus(
      name,
      status
    );
  }

  public async updateExpenseCategory(
    name: string,
    category: ExpenseCategory
  ): Promise<void> {
    return await this.updateCategoryExpenseService.updateExpenseCategory(
      name,
      category
    );
  }
  public async existExpense(name: string): Promise<boolean> {
    return await this.existExpenseService.getExpenseExist(name);
  }
  
}
