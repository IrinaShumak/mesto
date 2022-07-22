export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-45/cards', {
      headers: {
        authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCards ({name, link}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-45/cards', {
    method: 'POST',
    headers: {
      authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

  updateProfileInfo ({fullname, description}) { 
  return fetch('https://mesto.nomoreparties.co/v1/cohort-45/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fullname,
      about: description
    })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
 }
 
 updateAvatar ({avatar}) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-45/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({avatar})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
 }

 takeUserInfo () {
   return fetch('https://nomoreparties.co/v1/cohort-45/users/me', {
    headers: {
      authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a'
    } 
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }) 
}

likePhoto (id, method) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-45/cards/${id}/likes`, {
    method: `${method}`,
    headers: {
      authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a'      
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

deleteCard(id) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-45/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a'      
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

}