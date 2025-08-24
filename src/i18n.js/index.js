import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./locals/ar.json";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
  },
  lng: "ar",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
