# Expense Tracker CLI - Command Line Expense Manager

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-8B8B8B?style=for-the-badge&logo=joi&logoColor=white)

<!-- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) -->

![Winston](https://img.shields.io/badge/Winston-1D1D1D?style=for-the-badge&logo=winston&logoColor=white)
![Inquirer](https://img.shields.io/badge/Inquirer-1D1D1D?style=for-the-badge&logo=inquirer&logoColor=white)
![UUID](https://img.shields.io/badge/UUID-4E4E4E?style=for-the-badge&logo=uuid&logoColor=white)

## Description

**Expense Tracker CLI** is a Node.js application designed to help you manage your personal finances directly from the command line. This tool allows users to track expenses, categorize them, and maintain a clear overview of their financial situation without the need for a graphical user interface. The application is fully modular and scalable, enabling easy adaptation and expansion to meet your needs.

## Technologies Used

- **TypeScript**: Ensures type safety and improves code maintainability.
- **Joi**: Used for validating expense data.
<!-- - **Jest**: A testing framework to ensure the robustness of the application. -->
- **Node.js**: The runtime environment for executing the CLI.
- **Winston**: For logging purposes.
- **UUID**: For generating unique IDs.

## Methodologies

This project adheres to the following practices and methodologies:

- **SOLID Principles**: Ensuring clean and maintainable code.
- **Modular Design**: Breaking down the application into smaller, independent modules for easier maintenance and scalability.
- **Pattern**: MVC.
<!-- - **Testing with Jest**: Each critical function is accompanied by unit tests to verify correct functionality. -->
- **Documentation**: The code is thoroughly documented to facilitate understanding and expansion.

## Project Structure

- **index.ts**: The main entry point of the application.
- **router**: Handles routing for command execution.
- **src/**: Contains the project's source code.
- **commands/**: Contains command definitions.
- **controllers/**: Manages the application logic.
- **repositories/**: Handles data persistence and retrieval.
- **services/**: Contains business logic.
- **models/**: Defines models for expenses and DTOs.
- **config/**: Configuration files, including logging setup.
- **errors/**: Custom error handlers for managing exceptions.
- **tests/**: Contains unit tests written in Jest.
- **dist/**: Contains the compiled JavaScript code.
- **validators/**: Contains validation logic.

## Installation

To install and run this application locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/roadmap-mini-projects/expense-tracker-cli.git

# Navigate to the project directory
cd expense-tracker-cli

# Install dependencies
npm install

# Build the project
npm run build

# Run the application
node dist/index.js [command]
```

---

## NOTE:

To use the `expense-cli` command from any directory, you can add `expense-cli.bat` to the PATH.

---

## Usage

Run `expense-cli` followed by a command to interact with the application:

```bash
# Add a new expense
expense-cli add

# Update an existing expense
expense-cli update

# Delete an expense by name
expense-cli delete

# List all expenses or filter by status
expense-cli list

# Update the category of an expense
expense-cli update-category

# Update the status of an expense
expense-cli update-status

# Delete all expenses
expense-cli delete-all
```

For more details on the commands, you can run:

```bash
expense-cli --help
```

## Source `Roadmap` from `task-tracker`

- [Project URL](https://roadmap.sh/projects/expense-tracker)
- [Solution in Roadmap](https://roadmap.sh/projects/expense-tracker/solutions?u=66bbc7704e7fe8964e18278f)

## Contributions

Contributions are welcome. You can open an issue or submit a pull request on the [GitHub repository](https://github.com/roadmap-mini-projects/expense-tracker-cli.git).

## Contact

![GitHub](https://img.shields.io/badge/GitHub-solideomyers-181717?style=for-the-badge&logo=github)
![LinkedIn](https://img.shields.io/badge/LinkedIn-franciscomyers-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)

If you have any questions or suggestions, feel free to contact me through [GitHub](https://github.com/solideomyers) or [LinkedIn](https://www.linkedin.com/in/franciscomyers/).
