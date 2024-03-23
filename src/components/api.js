const api = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
    "Content-Type": "application/json",
  },
};
export const addCard = (name, link) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => res.json());
};

export const getCards = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    headers: config.headers,
  }).then((res) => res.json());
};

export const deleteMyCard = (cardId) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/${cardId}`,
    {
      method: "DELETE",
      headers: config.headers,
    }
  ).then((res) => res.json());
};

export const addLike = (cardId) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: config.headers,
    }
  ).then((res) => res.json());
};
export const removeLike = (cardId) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: config.headers,
    }
  ).then((res) => res.json());
};
export const updateUserInfo = (name, about) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => res.json());
};
export const userInfo = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "GET",
    headers: config.headers,
  }).then((res) => res.json());
};

export const userAvatar = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "GET",
    headers: config.headers,
  }).then((res) => res.json());
};

export const updateUserAvatar = (avatar) => {
  return fetch(
    "https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me/avatar",
    {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    }
  ).then((res) => res.json());
};
