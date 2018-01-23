const User = (function() {
  const all = []
  return class User {
  constructor({id, name}){
    this.id = id
    this.name = name
    all.push(this)
  }

  static all() {
    return all
  }

}
})();
