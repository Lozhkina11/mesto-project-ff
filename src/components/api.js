const api = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
    "Content-Typeapi": "application/json",
  },
};
export const addCard = (name, link) => {
  return fetch(`${api.baseUrl}/cards`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  
};

export const getCards = () => {
  return fetch(`${api.baseUrl}/cards`, {
    headers: api.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteMyCard = (cardId) => {
  return fetch(
    `${api.baseUrl}/cards/${cardId}`,
    {
      method: "DELETE",
      headers: api.headers,
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const addLike = (cardId) => {
  return fetch(
    `${api.baseUrl}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: api.headers,
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
export const removeLike = (cardId) => {
  return fetch(
    `${api.baseUrl}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: api.headers,
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
export const updateUserInfo = (name, about) => {
  return fetch(`${api.baseUrl}/users/me`, {
    method: "PATCH",
    headers: api.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
export const userInfo = () => {
  return fetch(`${api.baseUrl}/users/me`, {
    method: "GET",
    headers: api.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const userAvatar = () => {
  return fetch(`${api.baseUrl}/users/me`, {
    method: "GET",
    headers: api.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const updateUserAvatar = (avatar) => {
  return fetch(
    `${api.baseUrl}/users/me/avatar`,
    {
      method: "PATCH",
      headers: api.headers,
      body: JSON.stringify({
        avatar,
      }),
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });;
};
