import PopupWithForm from "./PopupWithForm";
import React, {useRef} from "react";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatar = useRef()
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar:  avatar.current.value
        });
    }

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <input
                id="popup-avatar"
                name="avatar"
                type="url"
                className="form__input"
                placeholder="Ссылка на картинку"
                required
                ref={avatar}
            />
            <span id="popup-avatar-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup