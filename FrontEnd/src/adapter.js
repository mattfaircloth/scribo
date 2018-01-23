class Adapter {

  static getUsers(){
    return fetch("http://localhost:3000/api/v1/users")
    .then(resp => resp.json())
  }

  static getCurrentUsersLectures(){
    return fetch(`http://localhost:3000/api/v1/users/${App.currentUser.id}/lectures`)
    .then(resp => resp.json())
  }


  static createUsers({passedInName}){
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: passedInName
      })
    }).then(resp => resp.json())
  }

  static getCurrentUsersSelectedLectureNotebook(lectureId) {
    return fetch(`http://localhost:3000/api/v1/users/${App.currentUser.id}/notebooks`, {

    })
  }


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





  static getLectures(){
  }

  static createLectures(){
    return fetch("http://localhost:3000/api/v1/lectures", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        title: "theActualtitle",
        date_time: "theActualdatetime",
        userid: 2
      })
    }).then(resp => resp.json())
  }

  static updateLectures(){
  }

  static deleteLectures(){
  }



  static getNotebooks(){
  }

  static updateNotebooks(){
  }

  static deleteNotebooks(){
  }

}
