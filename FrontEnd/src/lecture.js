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
    return `<div class="lecture-link" id="lecture-${this.id}" data-lectureid="${this.id}" data-action="click-lecture">Lecture: ${this.title} - Date: ${this.date_time}</div>`
  }



  static renderCreateLectureFormForNotebookContainer(){
    return `<div class="create-lecture-form"
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
