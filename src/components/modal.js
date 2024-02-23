function openModal(overlay) {
  overlay.classList.add("popup_is-opened"); // добавление плавности на открытие
}

function closeModal(overlay) {
  overlay.classList.remove("popup_is-opened"); //добавление плавности на закрытие
}
export { openModal, closeModal };
