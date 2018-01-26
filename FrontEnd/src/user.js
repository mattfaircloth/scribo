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

  static allNames() {
    const allWithoutCurrent = all.splice(all.indexOf(App.currentUser), 1)
    return all.map( user => user.name )
  }

  renderUsersforMenuContainer() {
    if (this === App.currentUser) {
      return `<div class="current-user-link" id="user-${this.id}" data-userid="${this.id}" data-action="click-user">${this.name}</div>`
    }else{
      return `<div class="users-link" id="user-${this.id}" data-userid="${this.id}" data-action="click-user">${this.name}</div>`
    }
  }

  renderForAddUser() {
    return `<span class="user-to-add" id="user-to-add-${this.id}">
            <span class="user-to-add-name">${this.name}</span>
            <span class="remove-user-to-add-button-container" id=remove-user-button-${this.id}>
              <button type="button" id="remove-user-to-add-button-${this.id}" class="remove-user-to-add-button" title="Remover User" data-userid="${this.id}" data-action="remove-user">
              <i class="material-icons vw-smaller" data-userid="${this.id}" data-action="remove-user">close</i></span>
            </span>`
  }

}
})();
