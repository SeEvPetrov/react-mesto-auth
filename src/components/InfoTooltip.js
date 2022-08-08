import imageSuccessPath from "../images/Ok.svg";
import imageErrorPath from "../images/no.svg";

const InfoTooltip = (props) => {
  return (
    <div
      className={`popup popup_opened`}
    //   id={props.name}
    //   onClick={props.onClick}
    >
      <div className={'popup__container popup__container_type_auth'}>
        <img className="popup__image-auth" alt="" src={ props.isOk ? imageSuccessPath : imageErrorPath } />
        <p className="popup__caption_type_auth">{ props.isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
        <button
          className={'popup__button-close'}
          id={`${props.name}-closer`}
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
};
export default InfoTooltip;