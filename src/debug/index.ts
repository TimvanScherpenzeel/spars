export const installErrorHandler = (endpoint: string): void => {
  window.addEventListener('error', async (event: ErrorEvent) => {
    const { colno, error, filename, lineno, message } = event;

    const errorMessageResponse = await fetch(endpoint, {
      body: JSON.stringify({
        columnNumber: colno,
        error,
        filename,
        lineNumber: lineno,
        message,
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
