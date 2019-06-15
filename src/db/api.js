import React from 'react';

class TokenStorage {
  constructor(key = "token") {
    this.key = key;
  }

  setItem(data) {
    const serialized = JSON.stringify(data);
    localStorage.setItem(this.key, serialized);
  }

  getItem() {
    return localStorage.getItem(this.key);
  }

  removeItem() {
    localStorage.removeItem(this.key);
  }
}

class MyApi {
  constructor(apis) {
    this.apis = apis;

    ['get', 'post', 'patch', 'delete'].forEach(method => {
      this[method] = this.buildMethod(method);
    });
  }

  buildMethod = method => config => (endpoint, body) => {
    return this.sendRequest(config, method, endpoint, body);
  };

  buildUrl(config, endpoint) {
    return `${this.apis[config.api]}${endpoint}`;
  }

  buildHeaders(config) {

    const tokenStorage = new TokenStorage();

    const token = config.shouldAuthorize ? `Bearer${tokenStorage.getItem()}` : undefined;

    return {
      authorization: token,
      "content-type": "application/json"
    };
  }

  sendRequest(config, method, endpoint, body) {
    const url = this.buildUrl(config, endpoint);
    const headers = this.buildHeaders(config);

    const request = {
      method: method,
      body: JSON.stringify(body),
      headers
    };

    const requestHandler = (resolve, reject) => {
      fetch(url, request)
        .then(response => {
          const errorStatus = 300;
          if (response.status < errorStatus) {
            return response.json();
          }
          throw new Error("Server error");
        })//возвращать данные только тогда, когда код ответа меньше 300
        .then(data => resolve(data))
        .catch(error => reject(error.message)) // в ином случае throw new Error
    };

    return new Promise(requestHandler);
  };
}

const apis = {
  placeholder: "http://localhost:5000/api"
};

const api = new MyApi(apis);

const config = {
  api: "placeholder",
  shouldAuthorize: true
};

export { api, config };
