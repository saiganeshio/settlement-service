export class Logger {
  static info(message: string, metadata?: object) {
    console.log(
      JSON.stringify({
        level: 'INFO',
        message,
        ...metadata,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  static error(message: string, metadata?: object) {
    console.error(
      JSON.stringify({
        level: 'ERROR',
        message,
        ...metadata,
        timestamp: new Date().toISOString(),
      }),
    );
  }
}
