const Lecture = (function() {
  const all = []
  return class Lecture {
  constructor({title, date_time, id}){
    this.title = title
    this.dateTime = date_time
    this.id = id
    all.push(this)
    this.notebooks = Notebook.all().filter(notebook => notebook.lectureId === this.id)
    this.users = this.notebooks.map(notebook => notebook.userId).map(userId => User.all().find(user => user.id == userId))
  }

  static all() {
    return all
  }

  renderLectureForMenuContainer() {
    return `<div class="menu-lecture-container" id="menu-lecture-container-${this.id}" data-lectureid="${this.id}" data-action="click-lecture">
              <div class="menu-lecture-title" data-lectureid="${this.id}" data-action="click-lecture">${this.title}</div>
              <div class="menu-lecture-date" data-lectureid="${this.id}" data-action="click-lecture">${this.dateTime}</div>
            </div>`
  }

  renderLectureForNotebookMenuContainer() {
    return `<div id="notebook-menu-container">
              <div id="menu-header">
                ${this.title}
              </div>
              <div id="menu-header-small">
                ${this.dateTime}
              </div>
              <div id="users-text">Users:</div>
              <div id="lecture-users">${this.users.map(user => user.renderUsersforMenuContainer()).join('')}</div>
              <div id="delete-lecture">
                <button type="button" id="delete-lecture-button-${this.id}" class="delete-lecture-button" title="Leave Lecture and Delete Notebook" data-lectureid="${this.id}" data-action="delete-lecture">
                <i class="material-icons vw-bigger">delete_forever</i>
              </button></div>
            </div>`
  }



}
})();
