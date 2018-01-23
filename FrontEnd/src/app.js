class App {
  static init() {
    App.createAllExistingUsers();
    App.pageElements();
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
    App.setCurrentuser(App.loginName.value)
    App.renderWelcomeForMenuContainer()
    App.createAllCurrentUserLectures()
  }

  static setCurrentuser(loginValue) {
    App.currentuser = User.all().find(user => user.name === loginValue)
  }

  static renderWelcomeForMenuContainer() {
    App.menuContainer.innerHTML = App.currentuser.renderForWelcomeForMenuContainer()
  }

  static createAllCurrentUserLectures() {
    const await = Adapter.getCurrentUsersLectures().then( lecturesData => lecturesData.forEach( lectureData => new Lecture(lectureData))).then(event => App.renderCurrentUserLecturesForNotebookContainer())
  }

  static renderCurrentUserLecturesForNotebookContainer() {
    App.menuContainer.innerHTML += `${Lecture.all().map( lecture => lecture.renderLectureForNotebookContainer() ).join('')}`
  }

  static signupEvent(event) {
    event.preventDefault()
    console.log("NOT IMPLEMENTED");
  }


}
