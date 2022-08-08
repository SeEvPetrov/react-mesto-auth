import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({email, toLink, textLink, ...props}) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <div className="header__container">
        { email ? <p className="header__email">{email}</p> : '' }
        <Link className="header__link" to={toLink}>{textLink}</Link>
      </div>
    </header>
  );
}

export default Header;
