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
      App.currentSelectedLecture = Lecture.all().find(lecture => lecture.id == event.target.dataset.lectureid)
      let usersNotebook = App.currentSelectedLecture.notebooks.find(notebook => notebook.userId === App.currentUser.id)
      App.handleRenderNotebook(App.currentSelectedLecture, usersNotebook)

    }
  }

  static handleRenderNewLectureFormForMenuContainer() {
    App.handleRenderLogoForNotebookContainer()
    App.menuContainer.innerHTML = App.renderCreateLectureFormForMenuContainer()
    $( "#users-search" ).autocomplete({
      source: User.allNames()
    });
  }

  static renderCreateLectureFormForMenuContainer(){
    return `<div id=>
            <div id="create-lecture-form">
              <input type="text" id="new-lecture-title" placeholder="Title"><br>
              <input type="text" id="new-lecture-date" placeholder="Date"><br><br>
              <input id="users-search">
              <button type="button" id="add-user-button"><i class="material-icons vw-smaller">add_box</i></button><br><br>
              <div id="users-to-add"></div>
              <button type="button" id="new-lecture-button-submit">Create Lecture</button>
            </div>`
  }


  static newLectureElements() {
    App.newLectureAddUserButton = document.getElementById("add-user-button")
    App.newLectureAddUserInput = document.getElementById("users-search")
    App.newLectureUsersToAddContainer = document.getElementById("users-to-add")
    App.newLectureSubmitButton = document.getElementById("new-lecture-button-submit")
    App.newLectureTitle = document.getElementById("new-lecture-title")
    App.newLectureDate = document.getElementById("new-lecture-date")
    App.arrOfUsersToAdd = []
  }

  static newLectureListeners(){
    App.newLectureSubmitButton.addEventListener("click", (event)=>{
      Adapter.createLecture(App.newLectureTitle.value, App.newLectureDate.value, App.currentUser.id)
        .then(json => App.arrOfUsersToAdd.forEach( user => Adapter.createNotebooksForNewLecture(user.id, json.id)
        .then( res => {
          App.deleteObjectsStoredInFrontEnd()
          App.rerequestAllObjects()
        }).then( res => App.handleWelcomeAndCurrentUserLecturesForMenuContainer() )))
    })

    App.newLectureAddUserButton.addEventListener("click", event => App.addUserButtonEvent(event))
  }

  static addUserButtonEvent(event) {
    event.preventDefault();
    const userToAdd = User.all().find(user => user.name == App.newLectureAddUserInput.value)
    const userToAddName = userToAdd.name
    App.newLectureUsersToAddContainer.insertAdjacentHTML('beforeend', userToAdd.renderForAddUser())
    App.arrOfUsersToAdd.push(userToAdd)
  }

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

  static handleRenderNotebook(lecture, notebook) {
    App.notebookContainer.innerHTML = notebook.renderNotebookForNotebookContainer()
    App.menuContainer.innerHTML = lecture.renderLectureForNotebookMenuContainer()
    App.notebookListeners()
  }

  static notebookListeners() {
    App.notebookTextArea = document.getElementById("notebook-textarea")
    App.notebookTextArea.addEventListener('keyup', event => App.autoSaveNotebookEvent(event))
    App.notebookTextArea.addEventListener('blur', event => App.hardSaveNotebookEvent(event))

    App.saveStatusButton = document.getElementById("save-status-button")
    App.saveStatusButton.addEventListener('click', event => App.hardSaveNotebookEvent(event))

    App.lectureUsersContainer = document.getElementById("lecture-users")
    App.lectureUsersContainer.addEventListener('click', event => App.clickUserEvent(event))
  }

  static autoSaveNotebookEvent(event) {
    event.preventDefault()
    var notebookToSave = Notebook.all().find(notebook => notebook.id == event.target.dataset.notebookid)
    App.saveStatusButton.style.color = "rgb(207, 87, 87)"
    if (new Date() - notebookToSave.lastsave > 5000) {
      Adapter.saveNotebook(notebookToSave.id, App.notebookTextArea.value)
      .then(json => notebookToSave.content = json.content)
      .then(res => {notebookToSave.lastsave = new Date()
                    App.saveStatusButton.style.color = "rgb(92, 221, 112)"})
    }
    // setTimeout(event => console.log(event.target), 50000)
  }

  static hardSaveNotebookEvent(event) {
    event.preventDefault()
    var notebookToSave = Notebook.all().find(notebook => notebook.id == event.target.dataset.notebookid)
    Adapter.saveNotebook(notebookToSave.id, App.notebookTextArea.value)
    .then(json => notebookToSave.content = json.content)
    .then(res => {notebookToSave.lastsave = new Date()
                  App.saveStatusButton.style.color = "rgb(92, 221, 112)"})
    }

  static clickUserEvent(event) {
    event.preventDefault()
    if (event.target.dataset.action === "click-user") {
      let clickedUser = User.all().find(user => user.id == event.target.dataset.userid)
      let notebookToRender = Notebook.all().find(notebook =>
        notebook.userId === clickedUser.id && notebook.lectureId === App.currentSelectedLecture.id
      )
      if (clickedUser.id !== App.currentUser.id) {
          Notebook.all().length = 0
          App.createAllNotebooks()
          App.notebookContainer.innerHTML = notebookToRender.renderOtherUserNotebookForNotebookContainer()
        } else {
          App.handleRenderNotebook(App.currentSelectedLecture, notebookToRender)
        }
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
              <i class="material-icons vw">note_add</i>
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
