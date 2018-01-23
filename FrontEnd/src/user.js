const User = (function() {
  const all = []
  return class User {
  constructor({id, name}){
    this.id = id
    this.name = name
    this.lectures = []
    this.notebooks = []
    all.push(this)
  }

  static all() {
    return all
  }

  renderForWelcomeForMenuContainer(){
    return `Welcome ${this.name}!`
  }

  renderNewLectureButtonForMenuContainer(){
    return `<button type="button" id="create-new-lecture-button">Create A Lecture</button>`
  }



}
})();
