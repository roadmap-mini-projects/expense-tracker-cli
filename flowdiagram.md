# Flujo de Trabajo

## Usuario
- Entrada: Escribe un comando en la CLI

## CLI
- Acción: Pasa el comando al Command Router

## Command Router
- Acción: Crea una instancia del comando adecuado (e.g., AddExpenseCommand)
- Acción: Llama al método execute del comando

## Comando (e.g., AddExpenseCommand)
- Acción: Llama al método correspondiente en el ExpenseController

## ExpenseController
- Acción: Llama al método correspondiente en el ExpenseService

## ExpenseService
- Acción: Llama al método correspondiente en el ExpenseRepository

## ExpenseRepository
- Acción: Realiza la operación de persistencia (e.g., añadir un gasto)
- Salida: Retorna el resultado a ExpenseService

## ExpenseService
- Salida: Retorna el resultado a ExpenseController

## ExpenseController
- Salida: Retorna el resultado al comando

## Comando (e.g., AddExpenseCommand)
- Salida: Imprime un mensaje de éxito o error basado en el resultado
