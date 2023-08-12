import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeleteCardPopup({isOpen, onClose,onDel}) {
    function handleSubmit(e) {
        e.preventDefault();
        onDel();
    }
    return (
        <PopupWithForm
            name={'delete-element'}
            title={'Вы уверены'}
            buttonText={"Да"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}
export default DeleteCardPopup