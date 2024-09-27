import * as joi from 'joi';
import { DeleteExpenseDto } from '../models/dtos/delete-expense.dto';

export const deleteExpenseSchema = joi.object<DeleteExpenseDto>({
  id: joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is required',
  }),
});
