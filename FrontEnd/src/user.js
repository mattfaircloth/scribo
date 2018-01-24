const User = (function() {
  const all = []
  return class User {
  constructor({id, name}){
    this.id = id
    this.name = name
    all.push(this)
  }

  static all() {
    return all
  }

  renderUsersforMenuContainer() {
    return `<div class="users-link" id="user-${this.id}" data-userid="${this.id}" data-action="click-user">User: ${this.name}</div>`
  }

}
})();
