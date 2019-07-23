export const installRemoteErrorHandler = (endpoint: string): void => {
  window.addEventListener('error', (event: ErrorEvent) => {
    return new Promise((resolve, reject): void => {
      fetch(endpoint, {
        body: JSON.stringify({
          columnNumber: event.colno,
          error: event.error,
          filename: event.filename,
          lineNumber: event.lineno,
          message: event.message,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(response => response.json())
        .then(message => resolve(message))
        .catch(err => reject(err));
    });
  });
};
