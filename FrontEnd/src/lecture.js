class Lecture {
  constructor({title, date_time, id}){
    this.title = title
    this.date_time = date_time
    this.id = id
  }

  render(){
    return `<ul>
              <li id="li-${this.id}"> ${this.title} - ${this.date_time}</li>
            </ul>`
  }
  
}
