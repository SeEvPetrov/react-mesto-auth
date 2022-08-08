import { Link } from "react-router-dom";
import Header from "./Header";

const Register = (props) => {
  return (
    <>
      <Header textLink={"Войти"} toLink={"/sign-in"} />
      <form className="register" action="#">
        <fieldset className="register__fieldset">
          <h2 className="register__title">Регистрация</h2>

          <label className="register__form-field">
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={props.email}
              value={props.handleChangeInput}
              minLength="5"
              maxLength="40"
              required
            />
          </label>
          <label className="register__form-field">
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              autoComplete="off"
              onChange={props.password}
              value={props.handleChangeInput}
              minLength="5"
              maxLength="40"
              required
            />
          </label>
          <button type="submit" className="register__submit-btn">
            Зарегистрироваться
          </button>

          <div className="register__question-container">
            <p className="register__question">Уже зарегистрированы?</p>
            <Link to="/sign-in" className="register__link">
              Войти
            </Link>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Register;
