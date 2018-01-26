class App {
  static init() {
    App.masterContainer = document.getElementById("master")
    App.createAllExistingUsers()
    if (localStorage.jwt) {
          App.masterContainer.innerHTML = App.renderReloadPage();
          App.createAllNotebooks()
          App.pageElements()
          App.pageListeners()
          setTimeout(function(){App.setCurrentUser(localStorage.getItem('name'))
                    App.handleRenderMenu()
                    App.createAllCurrentUserLectures() }, 500);

    }else{
      App.masterContainer.innerHTML = App.renderFreshPage();
      App.createAllNotebooks()
      App.pageElements()
      App.pageListeners()
      App.loginSignupElements()
      App.loginSignupListeners()
    }
  }

  static createAllExistingUsers() {
    Adapter.getUsers().then( usersData => usersData.forEach( userData => new User(userData)))
  }

  static pageElements() {
    App.notebookContainer = document.getElementById("notebook")
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
    App.userNamesArray = User.allNames()
    App.menuContainer.innerHTML = App.renderCreateLectureFormForMenuContainer()
    $( "#users-search" ).autocomplete({
      source: App.userNamesArray
    });
  }

  static renderCreateLectureFormForMenuContainer(){
    return `<div id="new-lecture-container">
            <div id="menu-header">
              Host a<br/>New Lecture
            </div>
            <div id="create-lecture-form">
              <input type="text" id="new-lecture-title" placeholder="Title"><br>
              <input type="datetime-local" id="new-lecture-date" placeholder="Date"><br><br>
              <input id="users-search" placeholder="Add Users">
              <button type="button" id="add-user-button"><i class="material-icons vw-smaller">add_box</i></button><br><br>
              <div id="users-to-add"></div>
              <button type="button" id="new-lecture-button-submit"><i class="material-icons vw-bigger">save</i></button>
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
    App.newLectureSubmitButton.addEventListener("click", event => App.newLectureClickEvent(event))
    App.newLectureAddUserButton.addEventListener("click", event => App.addUserButtonEvent(event))
  }

  static newLectureClickEvent() {
    Adapter.createLecture(App.newLectureTitle.value, App.newLectureDate.value, App.currentUser.id)
      .then(json => App.arrOfUsersToAdd.forEach( user => Adapter.createNotebooksForNewLecture(user.id, json.id)))
      .then(res => App.deleteObjectsStoredInFrontEnd())
      .then(res => App.rerequestAllObjects())
      .then(res => location.reload())
  }

  static addUserButtonEvent(event) {
    event.preventDefault();
    const userToAdd = User.all().find(user => user.name == App.newLectureAddUserInput.value)

    if (!App.arrOfUsersToAdd.includes(userToAdd)){
      const userToAddName = userToAdd.name
      const userToAddIndex = App.userNamesArray.indexOf(userToAddName)
      App.userNamesArray.splice(userToAddIndex, 1)
      App.newLectureUsersToAddContainer.insertAdjacentHTML('beforeend', userToAdd.renderForAddUser())
      App.arrOfUsersToAdd.push(userToAdd)
      App.newLectureRemoveUsersToAddContainer = document.getElementById(`remove-user-to-add-button-${userToAdd.id}`)
      App.newLectureRemoveUsersToAddContainer.addEventListener("click", event => App.removeUserFromAddUserContainerButtonEvent(event))
    }
  }


  static removeUserFromAddUserContainerButtonEvent(event){
    event.preventDefault();
    const userToRemove = User.all().find(user => user.id == event.target.dataset.userid)
    const userToRemoveName = userToRemove.name
    const userToRemoveIndex = App.arrOfUsersToAdd.indexOf(userToRemove)
    App.newLectureUsersInAddUsersContainerParent = document.getElementById(`user-to-add-${userToRemove.id}`)
    App.newLectureUsersInAddUsersContainerParent.remove()
    App.arrOfUsersToAdd.splice(userToRemoveIndex, 1)
    App.userNamesArray.push(userToRemoveName)
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

    App.leaveLectureButton = document.getElementById("delete-lecture")
    App.leaveLectureButton.addEventListener('click', event => App.leaveLectureEvent(event))
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

  static leaveLectureEvent(event) {
    const notebookToDelete = Notebook.all().find(notebook => event.target.dataset.lectureid == notebook.lectureId)
    const notebookToDeleteIndex = Notebook.all().indexOf(notebookToDelete)
    Adapter.deleteNotebook(notebookToDelete.id).then( res => Notebook.all().splice(notebookToDeleteIndex, 1)).then(res => location.reload())
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
    App.loginPassword = document.getElementById("login-password")
    App.signupForm = document.getElementById("signup-form")
    App.signupName = document.getElementById("signup-name")
    App.signupPassword = document.getElementById("signup-password")
    App.signupConfirmPassword = document.getElementById("signup-confirm-password")
    App.helloMessage=document.getElementById("hello-message")
  }

  static loginSignupListeners() {
    App.loginForm.addEventListener('submit', event => App.loginEvent(event))
    App.signupForm.addEventListener('submit', event => App.signupEvent(event))
    //fetch users once user is return render user with instance method renderWelcomeForMenur
  }

  static signupEvent(event) {
    event.preventDefault()
    if (App.signupPassword.value === App.signupConfirmPassword.value) {
      Adapter.createUser(App.signupName.value, App.signupPassword.value)
      .then( res => new User(res))
      .then( res => App.login({name: App.signupName.value, password: App.signupPassword.value}))
    }

  }

  static loginEvent(event) {
    event.preventDefault()
    const loginParams = {name: App.loginName.value, password: App.loginPassword.value}
    App.login(loginParams)
  }

  static login(loginParams) {
    Adapter.login(loginParams)
      .then( user => {
        if (!user.error) {
          localStorage.setItem('jwt', user.jwt )
          localStorage.setItem('name', user.name )
          App.setCurrentUser(user.name)
          App.createAllCurrentUserLectures()
          App.handleRenderMenu()
        }else{
          App.helloMessage.innerHTML = user.error
        }
      })
    }

  static setCurrentUser(name) {
    App.currentUser = User.all().find(user => user.name === name)
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


  static handleRenderMenu() {
    App.masterContainer.insertAdjacentHTML('beforeend', App.renderHomeButton())
    App.homeButton = document.getElementById("home-button")
    App.homeButton.addEventListener('click', event => App.homeButtonClickEvent(event))

    App.masterContainer.insertAdjacentHTML('beforeend', App.renderNewLectureButton())
    App.newLectureButton = document.getElementById("create-new-lecture-button")
    App.newLectureButton.addEventListener('click', event => App.newLectureButtonClickEvent(event))

    App.masterContainer.insertAdjacentHTML('beforeend', App.renderLogoutButton())
    App.logoutButton = document.getElementById("logout-button")
    App.logoutButton.addEventListener('click', event => App.logout())
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

  static logout(){
    localStorage.removeItem('jwt')
    localStorage.removeItem('name')
    location.reload();
  }

  static renderFreshPage() {
    return `<div id="notebook">
             <div id="logo-container">
               <div id="logo-right-paren">(</div>
               <div id="logo-left-paren">)</div>
               <div id="logo-float-paren">)</div>
               <div id="logo-sribio">Scribo
               <div id="slogan">write, remember – learn together</div></div>
             </div>
           </div>
           <div id="menu">
             <div id="big-hello">Hello!</div>
             <div id="hello-message">Have a Scribo account?<br>Sign In here:</div>
             <form id="login-form">
               <input type="text" id="login-name" name="name" placeholder="Name"><br>
               <input type="password" id="login-password" name="password" placeholder="Password"><br>
               <input type="submit" id="login-submit" value="Sign In">
             </form>
             <div id="signup-message">
               Don't have an account?<br>
              </div>
               <form id="signup-form">
                 <input type="text" id="signup-name" name="name" placeholder="Name"><br>
                 <input type="password" id="signup-password" name="password" placeholder="Password"><br>
                 <input type="password" id="signup-confirm-password" name="password" placeholder="Confirm Password"><br>
                 <input type="submit" id="signup-button" value="Sign Up">
               </form>
               <div id ="small-sign-up-error"></div>
           </div>`
  }

  static renderReloadPage() {
    return `<div id="notebook">
             <div id="logo-container">
               <div id="logo-right-paren">(</div>
               <div id="logo-left-paren">)</div>
               <div id="logo-float-paren">)</div>
               <div id="logo-sribio">Scribo
               <div id="slogan">write, remember – learn together</div></div>
             </div>
           </div>
           <div id="menu">

           </div>`
  }

}
