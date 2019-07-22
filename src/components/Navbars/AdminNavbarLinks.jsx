import React from "react";
import { Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import da from "../../assets/img/flags/da-round.png";
import uk from "../../assets/img/flags/uk-round.png";

const HeaderLinks = () => {
  const resetLocalStorage = e => {
    if (window.confirm("Resetting drawn lines!")) {
      localStorage.removeItem("state");
      window.location.reload();
    }
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = e => {
    i18n.changeLanguage(e);
  };

  const flags = {
    da: da,
    "en-uk": uk
  };

  const currentLang = () => {
    return i18n.language.toLowerCase();
  };

  return (
    <div>
      <Nav pullRight>
        <NavItem onClick={resetLocalStorage}>{t('general.reset_data')}</NavItem>
        <NavDropdown
          onSelect={e => changeLanguage(e)}
          title={
            <div>
              <div className="flag">
                <img src={flags[currentLang()]} width="16" height="16" />
              </div>
              <p className="hidden-md hidden-lg">
                {t('general.language_selector')}
                <b className="caret" />
              </p>
            </div>
          }
          noCaret
          id="basic-nav-dropdown-2"
        >
          <MenuItem eventKey="en-uk" active={currentLang() === "en-uk"}>
            English
          </MenuItem>
          <MenuItem eventKey="da" active={currentLang() === "da"}>
            Danish
          </MenuItem>
        </NavDropdown>
      </Nav>
    </div>
  );
};
export default HeaderLinks;
