export const installErrorHandler = (endpoint: string): void => {
  window.addEventListener('error', async (event: ErrorEvent) => {
    const errorMessageResponse = await fetch(endpoint, {
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
    });

    const content = await errorMessageResponse.json();
    console.log(content);
  });
};
