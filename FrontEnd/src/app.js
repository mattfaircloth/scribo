class App {
  static init() {
    App.createAllExistingUsers()
    App.createAllNotebooks()
    App.pageElements()
    App.pageListeners()
    App.loginSignupElements()
    App.loginSignupListeners()
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
      App.handleRenderLecture(selectedLecture, usersNotebook)
      selectedLecture.users.forEach(user => App.menuContainer.innerHTML += user.renderUsersforMenuContainer())
    }
  }

  static handleRenderNewLectureFormForMenuContainer() {
    App.menuContainer.innerHTML = Lecture.renderCreateLectureFormForMenuContainer()
  }

  static newLectureElements() {
    App.newLectureSubmitButton = document.getElementById("new-lecture-button-submit")
    App.newLectureTitle = document.getElementById("new-lecture-title")
    App.newLectureDate = document.getElementById("new-lecture-date")
  }

  static newLectureListeners(){
    App.newLectureSubmitButton.addEventListener("click", (event)=>{
      Adapter.createLecture(App.newLectureTitle.value, App.newLectureDate.value, App.currentUser.id)
        .then( res => {
          App.deleteObjectsStoredInFrontEnd()
          App.rerequestAllObjects()
        }).then( res => App.handleWelcomeAndCurrentUserLecturesForMenuContainer() )

  })}

  static deleteObjectsStoredInFrontEnd(){
    Lecture.all().length = 0
    User.all().length = 0
    Notebook.all().length = 0
  }

  static rerequestAllObjects() {
    App.createAllExistingUsers()
    App.createAllNotebooks()
    App.createAllCurrentUserLectures()
  }

  static handleRenderNewLecture(lecture) {
    App.notebookContainer.innerHTML = lecture.renderLectureForMenuContainer()
    App.notebookContainer.innerHTML += "BLANK NOTEBOOK"
    App.menuContainer.innerHTML = lecture.renderLectureForMenuContainer()
  }

  static handleRenderLecture(lecture, notebook) {
    App.notebookContainer.innerHTML = lecture.renderLectureForMenuContainer()
    App.notebookContainer.innerHTML += notebook.renderNotebookForNotebookContainer()
    App.menuContainer.innerHTML = lecture.renderLectureForMenuContainer()
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
    App.handleRenderMenu()
  }

  static setCurrentUser(loginValue) {
    App.currentUser = User.all().find(user => user.name === loginValue)
  }

  static createAllCurrentUserLectures() {
    Adapter.getCurrentUsersLectures()
    .then( lecturesData => lecturesData.forEach( lectureData => {const lecture = new Lecture(lectureData)}) )
    .then( res => App.handleWelcomeAndCurrentUserLecturesForMenuContainer() )
  }

  static handleWelcomeAndCurrentUserLecturesForMenuContainer() {
    App.menuContainer.innerHTML = App.renderForHome()
    const userLecturesContainer = document.getElementById("user-lectures")
    userLecturesContainer.innerHTML = Lecture.all().map( lecture => lecture.renderLectureForMenuContainer() ).reverse().join('')
  }

  static renderForHome(){
    return `<div id="home-container">
            <div id="menu-header">Welcome,<br />
            <span id="menu-header-strong">${App.currentUser.name}</span>
            </div>
            <div id="your-lectures-text">Your lectures:</div>
            <div id="user-lectures"></div></div>`
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
    return `<button type="button" id="home-button" title='Home'>
              <i class="material-icons vw">home</i>
            </button>`
  }

  static renderNewLectureButton() {
    return `<button type="button" id="create-new-lecture-button" title='Host a New Lecture'>
              <i class="material-icons vw">speaker_notes</i>
            </button>`
  }

  static renderLogoutButton() {
    return `<button type="button" id="logout-button" title='Sign Out'>
              <i class="material-icons vw">exit_to_app</i>
            </button>`
  }

  static renderArchiveButton() {
    return `<button type="button" id="archive-button" title='Lecture Archive'>
              <i class="material-icons vw">archive</i>
            </button>`
  }


  static handleRenderMenu() {
    App.masterContainer.insertAdjacentHTML('beforeend', App.renderHomeButton())
    App.homeButton = document.getElementById("home-button")
    App.homeButton.addEventListener('click', event => App.homeButtonClickEvent(event))

    App.masterContainer.insertAdjacentHTML('beforeend', App.renderNewLectureButton())
    App.newLectureButton = document.getElementById("create-new-lecture-button")
    App.newLectureButton.addEventListener('click', event => App.newLectureButtonClickEvent(event))

    App.masterContainer.insertAdjacentHTML('beforeend', App.renderArchiveButton())

    App.masterContainer.insertAdjacentHTML('beforeend', App.renderLogoutButton())
  }

  static handleRenderLogoForNotebookContainer() {
    App.notebookContainer.innerHTML = App.renderLogoForNotebookContainer()
  }

  static homeButtonClickEvent(event) {
    event.preventDefault()
    App.handleWelcomeAndCurrentUserLecturesForMenuContainer()
    App.handleRenderLogoForNotebookContainer()
  }

  static newLectureButtonClickEvent(event) {
    event.preventDefault()
    App.handleRenderNewLectureFormForMenuContainer()
    App.newLectureElements()
    App.newLectureListeners()
  }

}
