import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
function Main (props) {
    const currentUser = useContext(CurrentUserContext)


    return (
        <main className="content">
            <section className="profile content__profile">
                <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка пользователя"/>
                <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar} ></button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__description">{currentUser.about}</p>
                    <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
            </section>
            <section className="elements content__elements">
                <ul className="elements__list">
                    {props.cards.map(card => (
                            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                        )
                    )}
                </ul>
            </section>
        </main>
    )
}
export default Main;