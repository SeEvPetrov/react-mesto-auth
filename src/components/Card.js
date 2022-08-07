import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  card,
  onCardClick,
  onConfirmClick,
  onCardLike,
  onCardDelete,
}) => {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = useContext(CurrentUserContext);

  // Создаем класс для кнопки удаления
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn ? "elements__item-delete" : ""}`;

  // создаем класс для кнопки лайка
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__item-like ${
    isLiked ? "elements__item-like_active" : ""
  }`;

  return (
    <li className="elements__item">
      <img
        className="elements__item-img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="elements__description">
        <h2 className="elements__item-title">{card.name}</h2>
        <div className="elements__like_container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__quantity-like">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
