import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

/**
 * LoggerWinston is a custom logger built on top of the Winston logging library.
 * It provides logging functionality with various levels (info, warn, error, debug) and
 * formats the log output with timestamps, context, and colorized output for the console.
 */
export class LoggerWinston {
  private logger: winston.Logger;

  /**
   * Constructs a LoggerWinston instance.
   *
   * @param context - The context or label that will be appended to each log message (e.g., class name, module).
   */
  constructor(context: string) {
    const logFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} - [${level}] - [${context}]: ${message}`;
    });

    // Create a new Winston logger instance with colorized console output and file logging
    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        colorize({
          level: true, // Enable colorization based on log level
          colors: { info: 'blue', error: 'red', warn: 'green' }, // Customize colors for log levels
        }),
        timestamp({ format: '[on] MM-DD-YYYY [at] HH:mm' }), // Format for timestamp
        logFormat
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }),
      ],
    });
  }

  /**
   * Logs a message at a specified level.
   *
   * @param level - The log level ('info', 'warn', 'error', etc.).
   * @param message - The message to log.
   */
  log(level: string, message: string): void {
    this.logger.log(level, message);
  }

  /**
   * Logs an informational message.
   *
   * @param message - The message to log.
   */
  info(message: string): void {
    this.logger.info(message);
  }

  /**
   * Logs a warning message.
   *
   * @param message - The message to log.
   */
  warn(message: string): void {
    this.logger.warn(message);
  }

  /**
   * Logs an error message.
   *
   * @param message - The error message to log.
   * @param error - Optional additional error details to log.
   */
  error(message: string, error?: unknown): void {
    this.logger.error(message, error);
  }

  /**
   * Logs a debug message, typically used for development and troubleshooting.
   *
   * @param message - The debug message to log.
   */
  debug(message: string): void {
    this.logger.debug(message);
  }
}
