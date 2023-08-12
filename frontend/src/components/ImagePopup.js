import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.link ? "popup_opened" : ""}`} >
            <div className="popup__container-img">
                <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                    <figcaption className="popup__figcaption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}
export default ImagePopup