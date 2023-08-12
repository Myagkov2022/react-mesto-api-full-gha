import React from "react";
import headerLogo from '../images/logo.svg'
import {Link, useLocation} from "react-router-dom";
function Header({ isLoggedIn, email, signOut}) {

    const {pathname} = useLocation();

    const text = pathname === `${"/sign-in"}` ? {"text": "Регистрация", "link":"/sign-up"} : {"text": "Войти", "link":"/sign-in"};
    return (
        <header className="header page__header">
            <img className="header__logo" src={headerLogo} alt="Логотип сайта Mesto"/>
            {
                isLoggedIn ?
                    <div className="header__nav">
                        <h2 className="header__link">{email}</h2>
                        <Link to='' onClick= {signOut} className="header__link_out">Выйти</Link>
                    </div> :
                    <div className="header__nav">
                        <Link to={text.link} className="header__link_out">{text.text}</Link>
                    </div>
            }

        </header>
    )
}
export default Header;