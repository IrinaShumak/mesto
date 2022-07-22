export default class Api {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;//https://mesto.nomoreparties.co/v1/cohort-45
    this._token = options.headers.authorization;
  }

  _getResponseData (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._getResponseData);
  }

  addNewCards ({name, link}) {
    return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${this._token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
    })
    .then(this._getResponseData)
  }

  updateProfileInfo ({fullname, description}) { 
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${this._token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fullname,
      about: description
    })
    })
    .then(this._getResponseData)
 }
 
 updateAvatar ({avatar}) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${this._token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({avatar})
    })
    .then(this._getResponseData)
 }

 takeUserInfo () {
   return fetch(`${this._url}/users/me`, {
    headers: {
      authorization: `${this._token}`
    } 
    })
    .then(this._getResponseData)
}

likePhoto (id, method) {
  return fetch(`${this._url}/cards/${id}/likes`, {
    method: `${method}`,
    headers: {
      authorization: `${this._token}`      
    }
  })
    .then(this._getResponseData)
}

deleteCard(id) {
  return fetch(`${this._url}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `${this._token}`      
    }
  })
    .then(this._getResponseData)
}

}