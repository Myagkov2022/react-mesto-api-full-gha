import React from "react";
function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened':''}`}  >
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
                <form className="popup__form form" name={props.name} noValidate onSubmit={props.onSubmit}>
                    <fieldset className="form__set">
                        {props.children}
                        <button className="form__submit" type="submit">{props.buttonText}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm