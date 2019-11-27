import React from "react";
import { Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import da from "../../assets/img/flags/da-round.png";
import uk from "../../assets/img/flags/uk-round.png";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const RESET_DEMO_DATA = gql`
  mutation {
    demoNetwork {
      rebuild
    }
  }
`

const HeaderLinks = () => {
  const { t, i18n } = useTranslation();

  const resetLocalStorage = e => {
    if (window.confirm("Resetting drawn lines!")) {
      localStorage.removeItem("state");
      window.location.reload();
    }
  };

  const resetDemoData = e => {
    if (window.confirm("Resetting demo database!")) {
      callResetMutation();
    }
  }

  const [callResetMutation, _] = useMutation(RESET_DEMO_DATA, {
    update: (proxy, mutationResult) => {
      window.location.reload();
    }
  });

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
        <NavItem onClick={resetDemoData}>{t('general.reset_demo_data')}</NavItem>
        <NavItem onClick={resetLocalStorage}>{t('general.reset_cache')}</NavItem>
        <NavDropdown
          onSelect={e => changeLanguage(e)}
          title={
            <div>
              <div className="flag">
                <img alt={currentLang()} src={flags[currentLang()]} width="16" height="16" />
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
