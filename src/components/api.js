export const addCard = (name, link) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => res.json());
};

export const getCards = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
    },
  }).then((res) => res.json());
};

export const deleteMyCard = (cardId) => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const addLike = (cardId) => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
export const removeLike = (cardId) => {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
export const updateUserInfo = (name, about) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => res.json());
};
export const userInfo = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "GET",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const updateUserAvatar = (avatarLink) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "90afa859-dbf5-4c4a-9511-58c7fa1eb5ec",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatarLink
    }),
  }).then((res) => res.json());
};