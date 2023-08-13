class Api {
    constructor(options) {
        this.baseURL = options.baseUrl
        this.headers = options.headers
    }

    _checkResponse(res) {
       return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }


    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {headers:this.headers})
             .then(res => this._checkResponse(res))
    }

    patchUserInfo({name, about}) {
        return fetch(`${this.baseURL}/users/me`, {
            method:'PATCH',
            headers:this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._checkResponse(res))
    }

    getInitialCards() {
        return fetch(`${this.baseURL}/cards`, {headers:this.headers})
            .then(res => this._checkResponse(res))
    }

    postNewCard({name, link}) {
        return fetch(`${this.baseURL}/cards`, {
            method: 'POST',
            headers:this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._checkResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.baseURL}/cards/${cardId}`, {
            method: 'DELETE',
            headers:this.headers,
        })
            .then(res => this._checkResponse(res))
    }

    patchUserAvatar({avatar}) {
        return fetch(`${this.baseURL}/users/me/avatar`, {
            method:'PATCH',
            headers:this.headers,
            body: JSON.stringify({
               avatar: avatar
            })
        })
            .then(res => this._checkResponse(res))
    }

    putCardLike(cardId) {
        return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method:'PUT',
            headers:this.headers,
        })
            .then(res => this._checkResponse(res))
    }

    deleteCardLike(cardId) {
        return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method:'DELETE',
            headers:this.headers,
        })
            .then(res => this._checkResponse(res))
    }
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.putCardLike(cardId);
        } else {
            return this.deleteCardLike(cardId);
        }
    }

}
 const api = new Api({
    baseUrl: 'https://api.mesto.myagkov.nomoreparties.co',
    headers: {
        authorization:   `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});
export default api