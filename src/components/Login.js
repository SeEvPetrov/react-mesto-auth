import Header from "./Header";

const Login = (props) => {
  return (
    <>
      <Header textLink={"Регистрация"} toLink={"/sign-up"} />
      <form className="register" action="#">
        <fieldset className="register__fieldset">
          <h2 className="register__title">Вход</h2>

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
            Войти
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
