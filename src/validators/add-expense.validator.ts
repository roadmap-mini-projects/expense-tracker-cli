import * as joi from 'joi';
import { AddExpenseDto } from '../models/dtos/add-expensa.dto';
import { Status } from '../models/enums/status.enum';
import { ExpenseCategory } from '../models/enums/expense-category.enum';

export const addExpenseSchema = joi.object<AddExpenseDto>({
  name: joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 100 characters long',
    'any.required': 'Name is required',
  }),
  description: joi.string().min(3).max(100).required().messages({
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 3 characters long',
    'string.max': 'Description must be less than 100 characters long',
    'any.required': 'Description is required',
  }),
  amount: joi.number().positive().precision(2).required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
    'any.required': 'Amount is required',
  }),
  category: joi
    .string()
    .valid(...Object.values(ExpenseCategory))
    .required()
    .messages({
      'string.base': 'Category must be a string',
      'string.valid': 'Category must be one of the valid categories',
      'any.required': 'Category is required',
    }),
  status: joi.string().valid(Status.TOPAY, Status.PAID).required().messages({
    'string.base': 'Status must be a string',
    'string.valid': 'Status must be either toPay or paid',
    'any.required': 'Status is required',
  }),
});
