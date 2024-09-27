import { UUID } from 'crypto';
import { ExpenseCategory } from './enums/expense-category.enum';
import { Status } from './enums/status.enum';

export class Expense {
  id: string;
  name: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  status: Status;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    amount: number,
    category: ExpenseCategory,
    status: Status,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
