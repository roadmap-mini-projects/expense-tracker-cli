import { AddExpenseDto } from '../../models/dtos/add-expensa.dto';
import { UpdateExpenseDto } from '../../models/dtos/update-expense.dto';
import { Status } from '../../models/enums/status.enum';
import { Expense } from '../../models/expense.model';

export interface ExpenseRepositoryInterface {
  addExpense(dto: AddExpenseDto): Promise<void>;
  updateExpense(name: string, dto: UpdateExpenseDto): Promise<void>;
  deleteExpense(name: string): Promise<void>;
  getExpenseExist(name: string): Promise<boolean>;
  getExpenseByName(name: string): Promise<Expense | null>;
  getExpenses(): Promise<Expense[]>;
  saveExpensesToFile(expenses: Expense[]): void;
}
