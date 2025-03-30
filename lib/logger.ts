type LogLevel = "debug" | "info" | "warn" | "error"

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private log(level: LogLevel, message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`

    if (level === "error") {
      console.error(`${prefix} ${message}`, ...args)
    } else if (level === "warn") {
      console.warn(`${prefix} ${message}`, ...args)
    } else if (level === "info" || this.isDevelopment) {
      console.info(`${prefix} ${message}`, ...args)
    } else if (this.isDevelopment) {
      console.debug(`${prefix} ${message}`, ...args)
    }
  }

  debug(message: string, ...args: any[]): void {
    this.log("debug", message, ...args)
  }

  info(message: string, ...args: any[]): void {
    this.log("info", message, ...args)
  }

  warn(message: string, ...args: any[]): void {
    this.log("warn", message, ...args)
  }

  error(message: string, ...args: any[]): void {
    this.log("error", message, ...args)
  }
}

export const logger = new Logger()

