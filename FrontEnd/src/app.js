class App {
  static init() {
    App.createAllExistingUsers();
    App.createAllNotebooks()
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
    App.homeButtonContainer = document.getElementById("home-button-container")
  }

  static pageListeners() {
    App.menuContainer.addEventListener('click', event => App.lectureClickEvent(event))
  }

  static lectureClickEvent(event) {
    if (event.target.dataset.action === "click-lecture") {
      event.preventDefault()
      const selectedLecture = Lecture.all().find(lecture => lecture.id == event.target.dataset.lectureid)
      const usersNotebook = selectedLecture.notebooks.find(notebook => notebook.userId === App.currentUser.id)
      App.notebookContainer.innerHTML = `${selectedLecture.renderLectureForMenuContainer()}`
      App.notebookContainer.innerHTML += usersNotebook.renderNotebookForNotebookContainer();

      //Create functionality to display Users in MenuContainer,
       App.menuContainer.innerHTML = `${selectedLecture.renderLectureForMenuContainer()}`
       selectedLecture.users.forEach(user => App.menuContainer.innerHTML += user.renderUsersforMenuContainer())

    }
    else if (event.target.dataset.action === "create-a-lecture") {
      event.preventDefault()
      App.createNewLecture()
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
  }

  static setCurrentUser(loginValue) {
    App.currentUser = User.all().find(user => user.name === loginValue)
  }

  static createAllCurrentUserLectures() {
    Adapter.getCurrentUsersLectures()
    .then( lecturesData => lecturesData.forEach( lectureData => new Lecture(lectureData)))
    .then(event => App.handleWelcomeAndCurrentUserLecturesForMenuContainer())
    .then(event => App.handleRenderHomeButton())
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
    return `<button type="button" id="create-new-lecture-button" data-action="create-a-lecture">Create A Lecture</button>`
  }

  static createAllNotebooks() {
    Adapter.getNotebooks().then( notebooksData => notebooksData.forEach( notebookData => new Notebook(notebookData)))
  }

  static signupEvent(event) {
    event.preventDefault()
    console.log("NOT IMPLEMENTED");
  }

  static renderLogoForNotebookContainer() {
    return `<div id="logo-container">
      <div id="logo-right-paren">(</div>
      <div id="logo-left-paren">)</div>
      <div id="logo-float-paren">)</div>
      <div id="logo-sribio">Scribo
      <div id="slogan">write, remember – learn together</div></div>
    </div>`
  }

  static renderHomeButton() {
    return `<button type="button" id="home-button">Home</button>`
  }

  static renderLogoutButton() {
    return `<button type="button" id="logout-button">Logout</button>`
  }


  static handleRenderHomeButton() {
    App.masterContainer.insertAdjacentHTML('beforeend', App.renderHomeButton())
    App.homeButton = document.getElementById("home-button")
    App.homeButton.addEventListener('click', event => App.homeButtonClickEvent(event))
  }

  static handleRenderLogoForNotebookContainer() {
    App.notebookContainer.innerHTML = App.renderLogoForNotebookContainer()
  }

  static homeButtonClickEvent(event) {
    event.preventDefault()
    App.handleWelcomeAndCurrentUserLecturesForMenuContainer()
    App.handleRenderLogoForNotebookContainer()
  }



  // static methods for creating a new lecture

  static createNewLecture(){
    App.menuContainer.innerHTML = Lecture.renderCreateLectureFormForNotebookContainer()
    App.newLectureSubmitButton = document.getElementById("new-lecture-button-submit")
    App.newLectureTitle = document.getElementById("new-lecture-title")
    App.newLectureDate = document.getElementById("new-lecture-date")

    App.newLectureSubmitButton.addEventListener("click", (event)=>{
      Adapter.createLectures(App.newLectureTitle.value, App.newLectureDate.value, App.currentUser.id).then( data => new Lecture(data))
    })


    // App.newLectureTitle = document.getElementById("new-lecture-title")
    // App.newLectureDate = document.getElementById("new-lecture-date")
  }



}
