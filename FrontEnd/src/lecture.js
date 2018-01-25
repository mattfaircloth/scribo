const Lecture = (function() {
  const all = []
  return class Lecture {
  constructor({title, date_time, id}){
    this.title = title
    this.date_time = date_time
    this.id = id
    all.push(this)
    this.notebooks = Notebook.all().filter(notebook => notebook.lectureId === this.id)
    this.users = this.notebooks.map(notebook => notebook.userId).map(userId => User.all().find(user => user.id == userId))
  }

  static all() {
    return all
  }

  renderLectureForMenuContainer(){
    return `<div class="menu-lecture-container" id="menu-lecture-container-${this.id}" data-lectureid="${this.id}" data-action="click-lecture">
              <div class="menu-lecture-title" data-lectureid="${this.id}" data-action="click-lecture">${this.title}</div>
              <div class="menu-lecture-date" data-lectureid="${this.id}" data-action="click-lecture">${this.date_time}</div>
              <div class="menu-lecture-archive">
                <button type="button" id="menue-archive-button-${this.id}" class="menu-lecture-archive-button" title="Archive Lecture" data-lectureid="${this.id}" data-action="archive-lecture">
                <i class="material-icons vw-smaller">archive</i>
                </button></div>
            </div>`
  }

  static renderCreateLectureFormForMenuContainer(){
    return `<div class="create-lecture-form">
              <br><br><br>
              <input type="text" id="new-lecture-title" placeholder="Title"><br>
              <input type="text" id="new-lecture-date" placeholder="Date"><br><br>
              <input type="text" name="" placeholder="Add Users">
              <button type="button" id="new-lecture-button-+">+</button><br><br>
              <button type="button" id="new-lecture-button-submit">Submit</button>
            </div>`
  }



}
})();
