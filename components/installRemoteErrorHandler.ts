// Vendor
// @ts-ignore stacktrace-js is not included in Spar
import StackTrace from 'stacktrace-js';

const LOG_LEVELS = {
  error: ['error'],
  info: ['info', 'log', 'debug'],
  warn: ['warn'],
};

// Pipe the console methods of this window so important logs are sent to the server
export const pipeConsoleToSocket = (
  windowRef: Window,
  socket: any,
  ignorePrefixes: string[]
): void => {
  Object.keys(LOG_LEVELS).forEach((level: string) => {
    LOG_LEVELS[level].forEach((method: string) => {
      const nativeMethod = windowRef.console[method];

      if (typeof nativeMethod !== 'function') {
        return;
      }

      windowRef.console[method] = async (...args: any): Promise<void> => {
        nativeMethod.apply(windowRef.console, args);

        let message;
        let meta: {
          code?: string;
          name?: string;
          fileName?: string;
          lineNumber?: string;
          stacktrace?: string;
          args?: string[];
        } = {};

        // Handle DOMException objects
        if (args[0] instanceof DOMException) {
          message = args[0].message;

          meta = {
            code: args[0].code,
            name: args[0].name,
          };
        } else if (args[0] instanceof Error) {
          // Handle Error objects
          message = args[0].message;

          if ('fileName' in args[0]) {
            meta.fileName = args[0].fileName;
          }

          if ('lineNumber' in args[0]) {
            meta.lineNumber = args[0].lineNumber;
          }

          // Try to enhance the error log with a stack trace
          try {
            meta.stacktrace = await StackTrace.fromError(args[0]);
          } catch (error) {
            // Failed to get a stack trace
          }
        } else {
          // Handle custom logs
          message = typeof args[0] === 'object' ? JSON.stringify(args[0]) : String(args[0]);
        }

        // Pass additional arguments in the meta object
        if (args.length > 1) {
          meta.args = args.slice(1);
        }

        // Filter out unwanted logs
        if (
          level === 'info' ||
          (level === 'warn' && ignorePrefixes.some(prefix => message.indexOf(prefix) === 0))
        ) {
          return;
        }

        // Send the log to server
        socket.log(level, message, meta);
      };
    });
  });

  // Catch JavaScript runtime and asset load errors and send them to the server
  window.addEventListener('error', ({ message, filename, lineno, colno, error }) => {
    StackTrace.fromError(error)
      .then(stacktrace => {
        socket.log('error', message, {
          colno,
          filename,
          lineno,
          stacktrace,
        });
      })
      .catch(() => {
        socket.log('error', message, {
          colno,
          filename,
          lineno,
        });
      });
  });
};
