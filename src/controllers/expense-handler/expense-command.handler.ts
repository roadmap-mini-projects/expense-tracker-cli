import { LoggerWinston } from '../../config/logger';
import { ExpenseError } from '../../errors/expense.errors';
import { AddExpenseDto } from '../../models/dtos/add-expensa.dto';
import { UpdateExpenseDto } from '../../models/dtos/update-expense.dto';
import { ExpenseCategory } from '../../models/enums/expense-category.enum';
import { Status } from '../../models/enums/status.enum';
import { Expense } from '../../models/expense.model';
import { ExpensePromptService } from '../../services/expense-prompt/expense-prompt.service';
import { ExpenseService } from '../../services/expense.service';

export class ExpenseCommandHandler {
  private readonly logger: LoggerWinston;
  private readonly expenseService: ExpenseService;
  private readonly promptService: ExpensePromptService;

  constructor(
    expenseService: ExpenseService,
    promptService: ExpensePromptService
  ) {
    this.logger = new LoggerWinston('Expense - Handler - Command');
    this.expenseService = expenseService;
    this.promptService = promptService;
  }

  public async promptAddExpense(): Promise<Expense> {
    try {
      const name = await this.promptService.promptValidatedQuestion(
        'Enter expense name ',
        '(e.g,. "Expense name")',
        'name'
      );

      const description = await this.promptService.promptValidatedQuestion(
        'Enter expense description ',
        '(e.g,. "Describe your expense")',
        'description'
      );

      const amountStr = await this.promptService.promptValidatedQuestion(
        'Enter expense amount ',
        '(e.g,. 200.00)',
        'amount'
      );

      const amount = Number(amountStr);

      const statusStr = await this.promptService.promptSelectOption(
        'Select expense status',
        Object.values(Status)
      );
      const statusKey = statusStr.toUpperCase() as keyof typeof Status;
      const status = Status[statusKey];

      const categoryStr = await this.promptService.promptSelectOption(
        'Select expense category',
        Object.values(ExpenseCategory)
      );
      const categoryKey =
        categoryStr.toUpperCase() as keyof typeof ExpenseCategory;

      const category = ExpenseCategory[categoryKey];

      const addExpenseDto: AddExpenseDto = {
        name,
        description,
        amount,
        status,
        category,
      };
      return await this.expenseService.addExpense(addExpenseDto);
    } catch (error) {
      throw ExpenseError.addExpense();
    }
  }

  public async promptUpdateExpense(): Promise<void> {
    try {
      const expenses = await this.expenseService.listExpense();

      if (expenses.length === 0) {
        throw ExpenseError.notFoundExpenses();
      }

      //  expenses to select
      const list = expenses.map((expense: { name: string }) => expense.name);
      // expense selected
      const name = await this.promptService.promptSelectOption(
        'Select expense',
        list
      );
      // console.log(name);

      const description = await this.promptService.promptValidatedQuestion(
        'Enter expense description to update ',
        '(e.g,. "Describe your expense")',
        'description'
      );
      const amountStr = await this.promptService.promptValidatedQuestion(
        'Enter expense amount ',
        '(e.g,. 200.00)',
        'amount'
      );

      const amount = parseFloat(amountStr);
      const updateExpenseDto: UpdateExpenseDto = { name, description, amount };

      await this.expenseService.updateExpense(name, updateExpenseDto);
      // this.logger.info('Expense updated successfully');
    } catch (error) {
      this.logger.error(`${error}`);
      throw new Error('Error controller to update expense');
    }
  }

  public async promptUpdateStatus(): Promise<void> {
    try {
      const expenses = await this.expenseService.listExpense();
      const list = expenses.map((expense: { name: string }) => expense.name);
      // expense selected
      const name = await this.promptService.promptSelectOption(
        'Select expense',
        list
      );

      const statusStr = await this.promptService.promptSelectOption(
        'Select expense status',
        Object.values(Status)
      );
      const statusKey = statusStr.toUpperCase() as keyof typeof Status;
      const status = Status[statusKey];
      await this.expenseService.updateExpenseStatus(name, status as Status);
    } catch (error) {
      throw ExpenseError.updateStatusExpenseError();
    }
  }

  public async promptUpdateCategory(): Promise<void> {
    try {
      const expenses = await this.expenseService.listExpense();
      const list = expenses.map((expense: { name: string }) => expense.name);
      // expense selected
      const name = await this.promptService.promptSelectOption(
        'Select expense',
        list
      );

      const categoryStr = await this.promptService.promptSelectOption(
        'Select expense status',
        Object.values(ExpenseCategory)
      );
      const statusKey =
        categoryStr.toUpperCase() as keyof typeof ExpenseCategory;
      const category = ExpenseCategory[statusKey];
      await this.expenseService.updateExpenseCategory(
        name,
        category as ExpenseCategory
      );
    } catch (error) {
      throw ExpenseError.updateStatusExpenseError();
    }
  }

  public async promptListExpense(): Promise<Expense[]> {
    // status?: Status
    const filter = await this.promptService.promptQuestion(
      'Do you wanna filter your list: '
    );
    // this.logger.info(`User selected filter: ${filter}`);
    if (filter !== 'yes') {
      return await this.expenseService.listExpense();
    } else {
      const statusStr = await this.promptService.promptSelectOption(
        'Select expense status',
        Object.values(Status)
      );
      const statusKey = statusStr.toUpperCase() as keyof typeof Status;
      const status = Status[statusKey];
      return await this.expenseService.listExpense(status);
    }
  }

  public async promptSelectExpense(): Promise<string> {
    const listFilter = await this.promptListExpense();

    //  expenses to select
    const list = listFilter.map((expense: { name: string }) => expense.name);
    // expense selected
    const name = await this.promptService.promptSelectOption(
      'Select expense',
      list
    );
    return name;
  }

  public async promptDeleteExpense(): Promise<Expense> {
    const name = await this.promptSelectExpense();
    return await this.expenseService.deleteExpense(name);
  }

  public async promptGetExpense(): Promise<void> {
    const name = await this.promptSelectExpense();
    const expense = await this.expenseService.getByNameExpense(name);
    this.logger.info(`Expense: ${expense.name} [$${expense.amount}]`);
  }
}
