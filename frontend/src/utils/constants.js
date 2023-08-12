export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


export const editButton = document.querySelector(".profile__edit");
export const editAvatarButton = document.querySelector(".profile__avatar-edit");
export const addButton = document.querySelector(".profile__add-button");
export const popupProfile = document.querySelector(".popup_type_profile");
export const editName = popupProfile.querySelector("#popup-name");
export const editDescription = popupProfile.querySelector("#popup-description");
export const popupFormEdit = document.forms["form-profile"];
export const popupFormAdd = document.forms["form-add"];
export const popupFormEditAvatar = document.forms["form-edit-avatar"];

export const validationSettings = {
    formSelector: '.form',
    formFieldset: '.form__set',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}