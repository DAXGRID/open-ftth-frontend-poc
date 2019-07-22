import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en-uk',
    preload: ['en-uk', 'da'],
    saveMissing: false,
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
      // TODO: 
      // get lambda service parsing new terms and uploading to POEditor
      // ideally download data from POEditor instead of static files
      // addPath: `https://sz0aswgib8.execute-api.us-west-2.amazonaws.com/dev/add_terms`,
    },

    detection: {
      lookupQuerystring: 'lng',
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    }

  });


export default i18n;