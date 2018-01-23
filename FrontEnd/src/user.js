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


}
})();
