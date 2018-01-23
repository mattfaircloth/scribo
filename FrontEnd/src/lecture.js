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

  renderLectureForMenuContainer(){
    return `<div class="lecture-link" id="lecture-${this.id}" data-lectureid="${this.id}" data-action="click-lecture">Lecture: ${this.title} - Date: ${this.date_time}</div>`
  }



}
})();
