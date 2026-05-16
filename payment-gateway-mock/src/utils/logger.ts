export class Logger {

    static info(message: string, metadata?: any) {

        console.log(
            JSON.stringify({
                level: 'INFO',
                message,
                ...metadata,
                timestamp: new Date().toISOString(),
            })
        );
    }

    static error(message: string, metadata?: any) {

        console.error(
            JSON.stringify({
                level: 'ERROR',
                message,
                ...metadata,
                timestamp: new Date().toISOString(),
            })
        );
    }
}