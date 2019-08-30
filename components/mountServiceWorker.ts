if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(registration => {
      console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
    })
    .catch(error => {
      console.log(`Registration failed with error: ${error}`);
    });
}
