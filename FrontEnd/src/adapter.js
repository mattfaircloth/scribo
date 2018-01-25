class Adapter {

  static getUsers(){
    return fetch("http://localhost:3000/api/v1/users")
    .then(resp => resp.json())
  }

  static getCurrentUsersLectures(){
    return fetch(`http://localhost:3000/api/v1/users/${App.currentUser.id}/lectures`)
    .then(resp => resp.json())
  }

  static getNotebooks(){
    return fetch("http://localhost:3000/api/v1/notebooks")
    .then(resp => resp.json())
  }

  static createLecture(lecTitle, lecDate, user_id){
    return fetch("http://localhost:3000/api/v1/lectures", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        title: lecTitle,
        date_time: lecDate,
        admin_id: user_id
      })
    }).then(resp => resp.json())
  }

  static getNotebooksForLecture(lecture) {
    return fetch(`http://localhost:3000/api/v1/lectures/${lecture.id}/notebooks`)
    .then(resp => resp.json())
  }

  static getUsersForLecture(lecture) {
    return fetch(`http://localhost:3000/api/v1/lectures/${lecture.id}/users`)
    .then(resp => resp.json())
  }

  static saveNotebook(notebookid, content) {
    return fetch(`http://localhost:3000/api/v1/notebooks/${notebookid}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({content: content})
    }).then(resp => resp.json())

  }

  static createNotebooksForNewLecture(userId, lectureId) {
    return fetch("http://localhost:3000/api/v1/notebooks/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({lecture_id: lectureId, user_id: userId})
    }).then(resp => resp.json())
  }

  // static createUsers({passedInName}){
  //   return fetch("http://localhost:3000/api/v1/users", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: passedInName
  //     })
  //   }).then(resp => resp.json())
  // }
  //
  // static getLectures(){
  // }

  // static getCurrentUsersSelectedLectureNotebook(lectureId) {
  //   return fetch(`http://localhost:3000/api/v1/users/${App.currentUser.id}/notebooks`, {
  //
  //   })
  //}


  // static updateUsers(passedInName){
  //   return fetch(`http://localhost:3000/api/v1/users/1`, {
  //     method: "PATCH",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: passedInName
  //     })
  //   }).then(resp => resp.json())
  // }


  // static deleteUsers(){
  //   return fetch(`http://localhost:3000/api/v1/users/1`, {
  //     method: "DELETE",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //     }
  //   }).then(resp => resp.json())
  // }

  // static updateLectures(){
  // }
  //
  // static deleteLectures(){
  // }
  //
  //
  //
  // static getNotebooks(){
  // }
  //
  // static updateNotebooks(){
  // }
  //
  // static deleteNotebooks(){
  // }

}
