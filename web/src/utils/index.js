import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import fetch from "isomorphic-fetch";

import rootReducer from "./reducer";

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function Storage() {

  window.addEventListener('storage', storeEvent, false);

  function storeEvent(event) {
    setTimeout(handle(event.key, event.newValue, event.oldValue), 0);
  }

  let Events = function () {
    this.size = 0;
    this.get = (key) => this[key];
    this.has = (key) => this.hasOwnProperty(key);

    this.set = (key, value) => {
      if (!this.has(key)) this.size++;
      this[key] = value;
      return value;
    };

    this.update = (key, value, extend) => {
      extend = extend || true;
      if (!this.has(key)) {
        this.size++;
        this[key] = value;
      } else {
        this[key] = extend ? Object.assign(this[key], value) : Object.merge(this[key], value);
      }
      return this[key];
    };

    this.remove = (key) => {
      if (this.has(key)) {
        delete this[key];
        this.size--;
      }
    };
    return this
  };

  let events = new Events();

  function handle(key, val, old) {
    if (val === 'undefined') return;
    let handlers = events.get(key);
    if (!handlers || !handlers.forEach) return false;
    handlers.forEach((func) => func(val, old));
  }

  let storage = {
    get(k) {
      return localStorage.getItem(k);
    },
    set(k, v) {
      localStorage.setItem(k, v);
    },
    remove(k) {
      localStorage.removeItem(k);
    },
    on: (key, handler) => {
      if (!events.has(key)) events.set(key, []);
      events.get(key).push(handler);
    },
    off: (key, handler) => {
      if (!handler) return events.remove(key);
      let arr = events.get(key);
      let index = arr.findIndex(handler);
      if (index > 0) arr.splice(index, 1);
    },
  };

  return storage;
}

export function configureStore() {
  const devTools = (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') ?
    window.devToolsExtension() : f => f;

  const loggerMiddleware = createLogger();
  const middleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  );

  const enhancer = compose(
    middleware,
    devTools
  );

  return createStore(
    rootReducer,
    enhancer
  );
}

export function requestJSON(method, url, body, auth) {

  let headers = {};
  headers["Content-Type"] = "application/json";

  if (auth) {
    headers["Authorization"] = ["Bearer", Storage().get("token")].join(" ");
  }

  let opts = {};
  opts.method = method;
  opts.headers = headers;

  if (!!body) {
    opts.body = JSON.stringify(body);
  }

  return fetch(url, opts)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json().then((res) => {
          return res;
        }).catch((e) => {
          return response;
        });
      }

      return response.json().then((e) => {
        throw e;
      });
    });
}

// Usually multipart/form-data is used when uploading files, and is a bit more complicated than application/x-www-form-urlencoded (which is the default for HTML forms).
// The specification for multipart/form-data can be found in RFC 1867 (https://www.ietf.org/rfc/rfc1867.txt).
// For a guide on how to submit that kind of data via javascript, see here (https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Sending_forms_through_JavaScript#Using_XMLHttpRequest_and_the_FormData_object).
// The basic idea is to use the FormData object (not supported in IE < 10):
export function requestFormData(method, url, body, auth) {

  let headers = {};

  if (auth) {
    headers["Authorization"] = ["Bearer", Storage().get("token")].join(" ");
  }

  let opts = {};
  opts.method = method;
  opts.headers = headers;

  let formData = new FormData();

  body.forEach(item => {
    formData.append(item.name, item);
  });

  opts.body = formData;

  return fetch(url, opts)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json().then((res) => {
          return res;
        }).catch((e) => {
          return response;
        });
      }

      return response.json().then((e) => {
        throw e;
      });
    });
}

export function request(method, url, headers, body, auth) {

  headers = headers || {};

  if (auth) {
    headers["Authorization"] = ["Bearer", Storage().get("token")].join(" ");
  }

  let opts = {};
  opts.method = method;
  opts.headers = headers || {};

  if (!!body) {
    opts.body = JSON.stringify(body);
  }

  return fetch(url, opts)
    .then(response => {
      return (response.status >= 200 && response.status < 300)
        ? response
        : response.then((e) => {
          throw e
        });
    });
}

export function file(url) {
  return new Promise((resolve, reject) => {
    try {
      window.open(url + "?x-auth-token=" + Storage().get("token"));
      resolve({status: true});
    } catch (e) {
      reject({error: e});
    }
  });
}

export function Serialize(obj) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && !!obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}