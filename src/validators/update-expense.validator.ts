import * as joi from 'joi';
import { Status } from '../models/enums/status.enum';
import { ExpenseCategory } from '../models/enums/expense-category.enum';
import { UpdateExpenseDto } from '../models/dtos/update-expense.dto';

export const updateExpenseSchema = joi.object<UpdateExpenseDto>({
  name: joi.string().min(3).max(100).optional().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 100 characters long',
  }),
  description: joi.string().min(3).max(100).optional().messages({
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 3 characters long',
    'string.max': 'Description must be less than 100 characters long',
  }),
  amount: joi.number().positive().precision(2).optional().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
  }),
  category: joi
    .string()
    .valid(...Object.values(ExpenseCategory))
    .optional()
    .messages({
      'string.base': 'Category must be a string',
      'string.valid': 'Category must be one of the valid categories',
    }),
  status: joi.string().valid(Status.TOPAY, Status.PAID).optional().messages({
    'string.base': 'Status must be a string',
    'string.valid': 'Status must be either toPay or paid',
  }),
});
