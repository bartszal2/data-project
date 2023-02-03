import { useState } from "react";
import { Link } from "react-router-dom";
import NavElement from "../../components/Header/NavElement";
import "../../styles/layouts/Header.scss";

function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo-name">DATA&PROJECT</div>
      </Link>
      <div className="header__menu">
        <div
          className="menu__mobile-icon"
          onClick={() => setOpenMobileMenu(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div
          className={
            openMobileMenu
              ? "menu__mobile menu__mobile--open"
              : "menu__mobile menu__mobile--closed"
          }
        >
          <div
            className="mobile__icon"
            onClick={() => setOpenMobileMenu(false)}
          >
            <span className="material-symbols-outlined"> close </span>
          </div>
          <NavElement
            linkPath="/"
            className="menu__element menu__element--mobile"
            classNameActive="menu__element--active"
            name="Home"
            clickHandler={() => setOpenMobileMenu(false)}
          />
          <NavElement
            linkPath="albums"
            className="menu__element"
            classNameActive="menu__element--active"
            name="Albums List"
            clickHandler={() => setOpenMobileMenu(false)}
          />
          <NavElement
            linkPath="posts"
            className="menu__element"
            classNameActive="menu__element--active"
            name="Posts List"
            clickHandler={() => setOpenMobileMenu(false)}
          />
          <NavElement
            linkPath="users"
            className="menu__element"
            classNameActive="menu__element--active"
            name="Users List"
            clickHandler={() => setOpenMobileMenu(false)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
