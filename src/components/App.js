import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import api from "../utils/Api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Гружу...",
    about: "еще чуть чуть",
  });
  const [email, setEmail] = useState('practicum@yandex.ru');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // функция постановки и снятия лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // функция удаления карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleConfirmDeleteClick = () => {
    setIsConfirmPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsConfirmPopupOpen(false);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route 
            path='/'
            element={
          <>
          <Header 
            email={email}
            toLink={'/'}
            textLink={'Выйти'}/>
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onConfirmClick={handleConfirmDeleteClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          </>
         }
        /> 
        
        {/* <Route
            path='/sign-up'
            element={<Register />}
          />
          <Route
            path='/sign-in'
            element={<Login />}
          />
          <Route
            path='*'
            element={
              loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
            }
          /> */}
        </Routes>
        <Register />
        <Login />
        <InfoTooltip />

  
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
