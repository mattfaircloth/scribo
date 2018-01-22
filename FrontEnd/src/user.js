class User {
  constructor({name, id}){
    this.name = name
    this.id = id
  }

  render() {

  }


  renderWelcomeForMenu(){
    return `Welcome ${this.name}!`
  }
}
