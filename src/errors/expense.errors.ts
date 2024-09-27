export class ExpenseError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'ExpenseError';
    this.code = code;
  }

  getFriendlyMessage(): string {
    return `[${this.code}] ${this.message}`;
  }

  static createNameError(): ExpenseError {
    return new ExpenseError(
      'Expense name is required. Please provide a name for the expense.',
      'EXPENSE_NAME_REQUIRED'
    );
  }

  static existExpenseError(name: string): ExpenseError {
    return new ExpenseError(`Expense with name: ${name}.`, 'EXPENSE_DUPLICATE');
  }

  static createDescriptionError(): ExpenseError {
    return new ExpenseError(
      'Expense description is required. Please provide a description for the expense.',
      'EXPENSE_DESCRIPTION_REQUIRED'
    );
  }

  static createIdError(): ExpenseError {
    return new ExpenseError(
      'Expense id is required. Please provide an id for the expense.',
      'EXPENSE_ID_REQUIRED'
    );
  }

  static expenseNotFoundError(name: string): ExpenseError {
    return new ExpenseError(
      `Expense with name ${name} not found.`,
      'EXPENSE_NOT_FOUND'
    );
  }

  static createInvalidStatusError(status: string): ExpenseError {
    return new ExpenseError(
      `Expense status '${status}' is invalid.`,
      'EXPENSE_INVALID_STATUS'
    );
  }

  static updateStatusExpenseError(): ExpenseError {
    return new ExpenseError(
      'Expense status cannot be updated. Please try again.',
      'EXPENSE_UPDATE_STATUS_ERROR'
    );
  }

  static notFoundExpenses(): ExpenseError {
    return new ExpenseError(`Expenses not found`, 'EXPENSES_NOT_FOUND');
  }

  static loadExpenseError(): ExpenseError {
    return new ExpenseError('Error loading expense', 'LOAD_EXPENSE_ERROR');
  }

  static saveError(): ExpenseError {
    return new ExpenseError('Error saving expense', 'SAVE_EXPENSE_ERROR');
  }

  static addExpense(): ExpenseError {
    return new ExpenseError('Error adding expense', 'ADD_EXPENSE_ERROR');
  }

  static isValidNumber(): ExpenseError {
    return new ExpenseError('Invalid number', 'INVALID_NUMBER');
  }
}
