import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeLink(e) {
        setLink(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }
    return (
        <PopupWithForm
            name={'new-element'}
            title={'Новое место'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <input id="popup-title" name="name" type="text" className="form__input" placeholder="Название"
                   minLength="2" maxLength="30" required value={name} onChange={handleChangeName}/>
            <span id="popup-title-error" className="form__input-error"></span>
            <input id="popup-link" name="link" type="url" className="form__input" placeholder="Ссылка на картинку"
                   required value={link} onChange={handleChangeLink}/>
            <span id="popup-link-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup