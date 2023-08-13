import React,{useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    console.log(props.card.owner, currentUser._id)
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__heart ${isLiked && 'element__heart_active'}`
    );
    const handleClick = () => {
        props.onCardClick(props.card);
    };
    const handleLikeClick = () =>{
        props.onCardLike(props.card);
    }
    const handleDeleteClick = () => {
        props.onCardDelete(props.card._id)
    }
    return (
        <li className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            {isOwn && <button className="element__trash" type="button" onClick={handleDeleteClick} />}
                <div className="element__description">
                    <h2 className="element__heading">{props.card.name}</h2>
                    <div className="element__likes">
                        <button className={cardLikeButtonClassName}  onClick={handleLikeClick} type="button"></button>
                        <p className="element__likes-count">{props.card.likes.length}</p>
                    </div>
                </div>
        </li>
    )
}

export default Card