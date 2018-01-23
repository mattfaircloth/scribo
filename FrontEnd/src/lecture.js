const Lecture = (function() {
  const all = []
  return class Lecture {
  constructor({title, date_time, id}){
    this.title = title
    this.date_time = date_time
    this.id = id
    this.users = []
    this.notebooks = []
    all.push(this)
  }

  static all() {
    return all
  }

  renderLectureForNotebookContainer(){
    return `<div id="lecture-${this.id}">${this.title} - ${this.date_time}</div>`
  }

}
})();
