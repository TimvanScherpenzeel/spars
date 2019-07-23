const installRemoteErrorHandler = endpoint => {
  window.addEventListener('error', event => {
    return new Promise((resolve, reject) => {
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
