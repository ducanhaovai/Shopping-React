import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../../public/locales/eng.json";
import viTranslation from "../../public/locales/vi.json";

// Add translations
const resources = {
  en: {
    translation: enTranslation,
  },
  vi: {
    translation: viTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
