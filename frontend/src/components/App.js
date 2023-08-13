import React, {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [deletedCard, setDeletedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        handleTokenCheck();
    }, [isLoggedIn])

    const handleTokenCheck = () => {
        if (localStorage.getItem('token')){
            const jwt = localStorage.getItem('token');
            auth.checkToken(jwt).then((res) => {
                        if (res) {
                            api.headers.authorization=  `Bearer ${localStorage.getItem('token')}`
                            setIsLoggedIn(true);
                            setEmail(res.email)
                            navigate("/", {replace: true})
                            Promise.all([api.getInitialCards(), api.getUserInfo()])
                                .then(([initialCards, user]) => {
                                    setCards(initialCards.reverse());
                                    setCurrentUser(user)
                                })
                                .catch((err) => {
                                    console.log(`Ошибка загрузки карточек:\n ${err.status} \n ${err.text}`);
                                });
                        }
                }
            )
        }
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
    }


    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(true)
    }
    function handleDeletePopupClick (id) {
        setIsDeleteCardPopupOpen(true)
        setDeletedCard(id)
    }

    function closeAllPopups () {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsDeleteCardPopupOpen(false)
        setIsInfoTooltipPopupOpen(false)
        setSelectedCard({})
        setDeletedCard({})
    }

    function handleCardClick (card)  {
        setSelectedCard(card);
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(`Ошибка постановки/удаления лайка:\n ${err.status} \n ${err.text}`);
            });
    }

    function handleCardDelete() {
        api.deleteCard(deletedCard)
          .then(res => {
              console.log(res)
              setCards((state) => state.filter((c) => c._id !== deletedCard));
              closeAllPopups()
          })
            .catch(err => {
                console.log(`Ошибка удаление карточки:\n ${err.status} \n ${err.text}`);
            });
    }

    function handleUpdateUser(userInfo) {
         api.patchUserInfo(userInfo)
             .then(res => {
                 setCurrentUser(res)
                 closeAllPopups()
         })
             .catch(err => {
                 console.log(`Ошибка обновления данных пользователя:\n ${err.status} \n ${err.text}`);
             });
    }

    function handleUpdateAvatar(avatar) {
        api.patchUserAvatar(avatar)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
        })
            .catch(err => {
                console.log(`Ошибка обновления аватара пользователя:\n ${err.status} \n ${err.text}`);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.postNewCard(card)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups()
            })
            .catch(err => {
                console.log(`Ошибка добавления нового места:\n ${err.status} \n ${err.text}`);
            });
    }
    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate("/sign-in", {replace: true})
    };

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(res => {
                if (res) {
                    setIsSuccess(true);
                    setIsInfoTooltipPopupOpen(true);
                    navigate("/sign-in", {replace: true})
                }
            })
            .catch(err => {
                console.log(err)
                setIsSuccess(false);
                setIsInfoTooltipPopupOpen(true);
            })
    }

    function handleAuthorize(email, password) {
        auth.authorize(email, password)
            .then(res => {
                if (res) {
                    handleLogin()
                    localStorage.setItem('token', res.token);
                    navigate("/", {replace: true})
                }
            })
            .catch(_err => {
                setIsSuccess(false);
                setIsInfoTooltipPopupOpen(true);
            })
    }

  return (
      <>
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <Header isLoggedIn={isLoggedIn} signOut={handleSignOut} email={email}/>
              <Routes>
                  <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
                  <Route path="/sign-in" element={<Login  isLoggedIn={isLoggedIn} handleAuthorize={handleAuthorize}/>} />


                  <Route path="/" element={isLoggedIn ?  <ProtectedRoute
                      path="/"
                      element={Main}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeletePopupClick}
                      isLoggedIn={isLoggedIn}
                  /> : <Navigate to="/sign-in" />}/>
              </Routes>

            <Footer/>
              <InfoTooltip isOpen={isInfoTooltipPopupOpen} isSuccess={isSuccess} onClose={closeAllPopups} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
              <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDel={handleCardDelete}/>
              <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
          </div>
      </CurrentUserContext.Provider>
      </>
  );
}

export default App;
