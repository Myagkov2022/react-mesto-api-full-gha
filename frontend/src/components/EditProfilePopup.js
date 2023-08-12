import PopupWithForm from "./PopupWithForm";
import React, {useState, useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name)
            setDescription(currentUser.about)
         }
    },[isOpen, currentUser])

    return (
        <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <input id="popup-name" name="name" type="text" className="form__input" placeholder="Введите свое имя"
                   minLength="2" maxLength="40" required onChange={handleChangeName}  value={name}/>
            <span id="popup-name-error" className="form__input-error"></span>
            <input id="popup-description" name="about" type="text" className="form__input" placeholder="О себе"
                   minLength="2" maxLength="200" required onChange={handleChangeDescription} value={description}/>
            <span id="popup-description-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;