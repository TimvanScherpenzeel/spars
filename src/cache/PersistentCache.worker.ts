// @ts-check
/* eslint-disable no-restricted-globals */

// Vendor
import { clear, del, get, keys, set, Store } from 'idb-keyval';

// Custom logging functionality because config was being inlined on build.
const warn = (logVerbosity: number, message: string) =>
  logVerbosity >= 2 && console.warn(`Ridge :: [WARN] -> ${message}`);

let store: Store;

self.onmessage = event => {
  const { type, key, value, databaseName, storeName, logVerbosity } = event.data;

  if (!store) {
    store = new Store(databaseName, storeName);
  }

  switch (type) {
    case 'set':
      set(key, value, store).catch(err =>
        warn(
          logVerbosity,
          `PersistentCache -> Set: { key: ${key}, value: ${value} } has failed with error: ${err}`
        )
      );
      break;
    case 'get':
      get(key, store)
        .then(val => {
          // @ts-ignore An argument for 'targetOrigin' was not provided, '*' breaks in browsers
          self.postMessage({
            key,
            type: 'get',
            val,
          });
        })
        .catch(err =>
          warn(
            logVerbosity,
            `PersistentCache -> Get: { key: ${key} } has failed with error: ${err}`
          )
        );
      break;
    case 'keys':
      keys(store)
        .then(storeKeys => {
          // @ts-ignore An argument for 'targetOrigin' was not provided, '*' breaks in browsers
          self.postMessage({
            keys: storeKeys,
            type: 'keys',
          });
        })
        .catch(err =>
          warn(
            logVerbosity,
            `PersistentCache -> Keys: { key: ${keys} } has failed with error: ${err}`
          )
        );

      break;
    case 'del':
      del(key, store).catch(err =>
        warn(
          logVerbosity,
          `PersistentCache -> Delete: { key: ${key} } has failed with error: ${err}`
        )
      );
      break;
    case 'clear':
      clear(store).catch(err =>
        warn(logVerbosity, `PersistentCache -> Clear: Store clearing has failed with error: ${err}`)
      );
      break;
    default:
      warn(logVerbosity, 'PersistentCache -> Event was not recognized');
      break;
  }
};
