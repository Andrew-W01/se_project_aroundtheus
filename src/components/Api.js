export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // _request(url, options) {
  //   return fetch(url, options).then(this.renderResult);
  // }

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse)
      .then((res) => res.json())
      .catch(this._handleError);
  }

  renderResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  // _checkResponse(res) {
  //   if (!res.ok) {
  //     throw new Error(`Error: ${res.status}`);
  //   }
  //   return res;
  // }

  fetchUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  fetchEditProfile(cardData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.title,
        about: cardData.description,
      }),
    });
  }

  fetchNewCard(cardData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.title,
        link: cardData.url,
      }),
    });
  }

  fetchDeleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  fetchLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  fetchDisLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  fetchProfilePicture(userData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData,
      }),
    });
  }

  loadPageResults() {
    return Promise.all([this.getInitialCards(), this.fetchUserInfo()]);
  }
}
