class TokenStorage {
  static key = "user";
  // constructor(key = "token") {
  //   this.key = key;
  // }

  static setItemInLocalStorage(user) {
    const serialized = JSON.stringify(user);
    localStorage.setItem(this.key, serialized);
  }

  static getItemFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  static removeItemInLocalStorage() {
    localStorage.removeItem(this.key);
  }

  static steItemInSessionStorage(user) {
    const serialized = JSON.stringify(user);
    sessionStorage.setItem(this.key, serialized);
  }

  static getItemFromSessionStorage() {
    return JSON.parse(sessionStorage.getItem(this.key));
  }

  static removeItemInSessionStorage() {
    sessionStorage.removeItem(this.key);
  }

}

export default TokenStorage;
