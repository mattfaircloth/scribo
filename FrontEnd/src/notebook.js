class Notebook {
  constructor({lecture_id, user_id, content}){
    this.lecture = Lecture.all.find(lecture => lecture.id == lecture_id)
    this.user = User.all.find( user => user.id == user_id)
    this.content = content

  }
}
