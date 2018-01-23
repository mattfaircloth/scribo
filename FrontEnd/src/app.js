class App {
  static init() {
    App.createAllExistingUsers();
    App.pageElements();
    App.pageListeners();
    App.loginSignupElements();
    App.loginSignupListeners();
  }

  static createAllExistingUsers() {
    Adapter.getUsers().then( usersData => usersData.forEach( userData => new User(userData)))
  }

  static pageElements() {
    App.notebookContainer = document.getElementById("notebook")
    App.masterContainer = document.getElementById("master")
    App.menuContainer = document.getElementById("menu")
  }

  static pageListeners() {
    App.menuContainer.addEventListener('click', event => App.lectureClickEvent(event))
  }

  static lectureClickEvent(event) {
    if (event.target.dataset.action === "click-lecture") {
      event.preventDefault()
      const selectedLecture = Lecture.all().find(lecture => lecture.id == event.target.dataset.lectureid)
      const currentNotebook = Notebook.all().find(notebook => notebook.lecture === selectedLecture)
      App.notebookContainer.innerHTML = currentNotebook.renderNotebookForNotebookContainer();

    }
  }

  static loginSignupElements() {
    App.loginForm = document.getElementById("login-form")
    App.loginName = document.getElementById("login-name")
    App.signupButton = document.getElementById("signup-button")
  }

  static loginSignupListeners() {
    App.loginForm.addEventListener('submit', event => App.loginEvent(event))
    App.signupButton.addEventListener('click', event => App.signupEvent(event))
    //fetch users once user is return render user with instance method renderWelcomeForMenur
  }

  static loginEvent(event) {
    event.preventDefault()
    App.setCurrentUser(App.loginName.value)
    App.createAllCurrentUserLectures()
    App.createAllCurrentUserNotebooks()
  }

  static setCurrentUser(loginValue) {
    App.currentUser = User.all().find(user => user.name === loginValue)
  }

  static createAllCurrentUserLectures() {
    const await = Adapter.getCurrentUsersLectures().then( lecturesData => lecturesData.forEach( lectureData => new Lecture(lectureData))).then(event => App.handleWelcomeAndCurrentUserLecturesForMenuContainer())
  }

  static handleWelcomeAndCurrentUserLecturesForMenuContainer() {
    App.menuContainer.innerHTML = App.renderForWelcomeForMenuContainer()
    App.menuContainer.innerHTML += `${Lecture.all().map( lecture => lecture.renderLectureForMenuContainer() ).join('')}`
    App.menuContainer.innerHTML += `${App.renderNewLectureButtonForMenuContainer()}`
  }

  static renderForWelcomeForMenuContainer(){
    return `<div id="welcome-message">Welcome,<br /><span id="welcome-user-name">${App.currentUser.name}</span>!</div>Your lectures:`
  }

  static renderNewLectureButtonForMenuContainer(){
    return `<button type="button" id="create-new-lecture-button">Create A Lecture</button>`
  }

  static createAllCurrentUserNotebooks() {
    const await = Adapter.getCurrentUsersNotebooks().then( notebooksData => notebooksData.forEach( notebookData => new Notebook(notebookData)))
  }

  static signupEvent(event) {
    event.preventDefault()
    console.log("NOT IMPLEMENTED");
  }


}
