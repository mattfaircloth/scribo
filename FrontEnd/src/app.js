class App {
  static init() {
    App.pageContainers();
    App.loginContainers();
    App.loginListeners();
  }

  static pageContainers() {
    App.notebookContainer = document.getElementById("notebook")
    App.masterContainer = document.getElementById("master")
    App.menuContainer = document.getElementById("menu")
  }

  static loginContainers() {
    App.loginForm = document.getElementById("login-form")
    App.loginName = document.getElementById("login-name")
    App.signupButton = document.getElementById("signup-button")
  }

  static loginListeners() {
    App.loginForm.addEventListener('submit', event => App.logIn(event))
  }

  static logIn(event) {
    event.preventDefault()

    console.log(event)
  }
}
