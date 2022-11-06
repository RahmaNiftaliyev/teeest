import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import translationEN from "./translates/en.json";
import translationAZ from "./translates/az.json";
import translationRU from "./translates/ru.json";
let lang = localStorage.getItem("lang");
const resources = {
  en: {
    translation: translationEN,
  },
  az: {
    translation: translationAZ,
  },
  ru: {
    translation: translationRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: lang,
  lng: lang,
});

export default i18n;
