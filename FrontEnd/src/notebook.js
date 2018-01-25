const Notebook = (function() {
  const all = []
  return class Notebook {
    constructor({id, lecture_id, user_id, content}){
      this.id = id
      this.lectureId = lecture_id
      this.userId = user_id
      if (content === null) {
        this.content = ""
      } else {
        this.content = content
      }
      this.lastsave = new Date()
      all.push(this)
    }

    static all() {
      return all
    }

    renderNotebookForNotebookContainer(){
      this.lecture = Lecture.all().find(lecture => lecture.id === this.lectureId)
      return `<div id="notebook-master">
                <div id="notebook-save-status-button">
                  <button type="button" id="save-status-button" data-notebookid="${this.id}" title='Save Lecture'>
                    <i class="material-icons vw" data-notebookid="${this.id}">save</i>
                  </button>
                </div>
                <div class="notebook-notebook" id="notebook-${this.id}" data-notebookid="${this.id}">
                  <textarea id="notebook-textarea" name="notebook-textarea" data-notebookid="${this.id}">${this.content}</textarea>
                </div>
              </div>`
    }

    renderOtherUserNotebookForNotebookContainer(userId){
      this.lecture = Lecture.all().find(lecture => lecture.id === this.lectureId)
      return `<div id="notebook-master">
                <div class="notebook-notebook" id="notebook-${this.id}" data-notebookid="${this.id}">
                  <div id="notebook-textarea" name="notebook-div" data-notebookid="${this.id}">${this.content}</div>
                </div>
              </div>`
    }

  }

})();
