import * as readline from 'readline';
import inquirer from 'inquirer';
import { AddExpenseDto } from '../../models/dtos/add-expensa.dto';
import { addExpenseSchema } from '../../validators/add-expense.validator';
export class ExpensePromptService {
  public promptQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  public async promptValidatedQuestion(
    question: string,
    exemple: string,
    field: keyof AddExpenseDto
  ): Promise<string> {
    let valid = false;
    let answer = '';

    while (!valid) {
      answer = await this.promptQuestion(`${question} ${exemple}: `);

      const { error } = addExpenseSchema.extract(field).validate(answer);
      if (error) {
        console.log(error.message);
      } else {
        valid = true;
      }
    }
    return answer;
  }

  public async promptSelectOption(
    questions: string,
    options: string[]
  ): Promise<string> {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'selection',
        message: questions,
        choices: options,
      },
    ]);

    if (options.length === 0) {
      console.log('Please must add a enpense');
      throw new Error('error selection');
    }

    return answer.selection;
  }
}
