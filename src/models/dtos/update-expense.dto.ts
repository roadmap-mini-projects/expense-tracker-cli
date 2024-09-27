import { ExpenseCategory } from '../enums/expense-category.enum';
import { Status } from '../enums/status.enum';

export class UpdateExpenseDto {
  public readonly name?: string;
  public readonly category?: ExpenseCategory;
  public readonly description?: string;
  public readonly amount?: number;
  public readonly status?: Status;

  constructor(
    name?: string,
    description?: string,
    amount?: number,
    category?: ExpenseCategory,
    status?: Status
  ) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.amount = amount;
    this.status = status;
  }
}
