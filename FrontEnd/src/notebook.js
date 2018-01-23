const Notebook = (function() {
  const all = []
  return class Notebook {
    constructor({id, lecture_id, user_id, content}){
      this.id = id
      this.lecture = Lecture.all().find(lecture => lecture.id == lecture_id)
      this.user = User.all().find( user => user.id == user_id)
      this.content = content
      all.push(this)
    }

    static all() {
      return all
    }

    renderNotebookForNotebookContainer(){
      return `<div class="notebook-link" id="notebook-${this.id}" data-notebookid="${this.id}" data-action="click-notebook">Content: ${this.content}</div>`
    }
  }

})();
