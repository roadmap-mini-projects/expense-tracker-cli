import { ValidationResult } from 'joi';
import { AddExpenseDto } from '../../models/dtos/add-expensa.dto';
import { addExpenseSchema } from '../../validators/add-expense.validator';
import { UpdateExpenseDto } from '../../models/dtos/update-expense.dto';
import { updateExpenseSchema } from '../../validators/update-expense.validator';

export class ExpenseValidationService {
  validateAddExpense(addExpenseDto: AddExpenseDto): ValidationResult {
    // Validate the input data
    const { error } = addExpenseSchema.validate(addExpenseDto);
    if (error) {
      throw new Error('invalid expense data');
    }
    return addExpenseSchema.validate(addExpenseDto, { abortEarly: false });
  }

  validateUpdateExpense(updateExpenseDto: UpdateExpenseDto): ValidationResult {
    //   Validate data
    const { error } = updateExpenseSchema.validate(updateExpenseDto);
    if (error) {
      throw new Error(`Data update invalid: ${error.message}`);
    }
    return updateExpenseSchema.validate(updateExpenseDto, {
      abortEarly: false,
    });
  }
}
